/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const cloudinary = require("../services/media/cloudinary");
const MediaRepo = require("../repositories/MediaRepo");
const UserRepo = require("../repositories/UserRepo");
const CommentRepo = require("../repositories/CommentRepo");
const NotificationsController = require("./NotificationsController");
const asyncWrapper = require("../helpers/asyncWrapper");
const { use } = require("../api");


class MediaController {
    static async sourceUpload(req, res) {
        // Media Types  = ["Media","Blocs","Profile"]
        const { mediaType } = req.query;
        const uploader = async(path) =>
            await cloudinary.uploads(path, mediaType.toString());
        try {
            const urls = [];
            const { files } = req;
            const sourceInfo = await cloudinary.sourceInfo(files, urls, uploader);
            if (sourceInfo.length === 0 || !sourceInfo[0])
                throw new Error("could not Reach cloud storage");
            res.status(200).json({
                message: "Media uploaded Successfully",
                data: sourceInfo,
            });
        } catch (err) {
            res.status(400).json({
                message: "Media not uploaded",
                err: err.message,
            });
        }
    }

    static async getMediaById(req, res) {
        try {
            const { mediaId } = req.params;
            const media = await new MediaRepo().getMediaById(mediaId);
            return res.status(200).json({
                success: true,
                message: "Get media success",
                data: media,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    static async getAllUserMediaByMediaType(req, res) {
        return asyncWrapper(async(req, res) => {
            const { mediaTypeId, page, userId } = req.query;
            const allUserMedia = await new MediaRepo().getAllUserMediaByMediaType(
                userId,
                mediaTypeId,
                page,
            );
            const userMediaString = allUserMedia.length ? JSON.stringify(allUserMedia[0]) : [];
            const userMediaInfo = typeof(userMediaString) === "string" ? await Promise.all(JSON.parse(userMediaString).media.map(async(ele) => {
                const userProfile = await new UserRepo().getUserProfileById(ele.userId);
                const mediaViewsCount = await new MediaRepo().getMediaViewsCount(ele.id);
                const obj = ele;
                obj.profile = { username: userProfile.username, profilePicture: userProfile.profilePicture };
                obj.viewsCount = mediaViewsCount;
                return obj;
            })) : [];

            return res.status(200).json({
                success: true,
                message: "Get media success",
                data: userMediaInfo,
            });
        })(req, res);
    }

    static async createMedia(req, res) {
        try {
            const userId = req.user.id;
            const mediaInfo = req.body;
            mediaInfo.userId = userId;
            mediaInfo.source = JSON.stringify(mediaInfo.source);

            const media = await new MediaRepo().createMedia(mediaInfo);
            return res.status(201).json({
                success: true,
                message: "Successfully Created Media",
                data: media,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    static async updateMedia(req, res) {
        try {
            const { mediaId } = req.params;
            const userId = req.user.id;
            const mediaInfo = req.body;
            mediaInfo.userId = userId;

            const media = await new MediaRepo().updateMedia(mediaId, mediaInfo);
            return res.status(201).json({
                success: true,
                message: "Successfully Updated Media",
                data: media,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    static async getMediaByHeadline(request, response) {
        return asyncWrapper(async(req, res) => {
            const { headline } = req.query;

            const media = await new MediaRepo().findByHeadline(headline);

            if (media.length === 0)
                return res.status(404).json({
                    success: false,
                    message: `There is no media with headline starting with ${headline}`,
                });

            res.status(200).json({
                success: true,
                message: `All media with headline starting with ${headline}`,
                data: media,
            });
        })(request, response);
    }

    static async deleteSource(req, res) {
        try{
            const {sourceId} = req.body;
            
            if (!sourceId){
                return res.status(400).json({
                    success: false,
                    message: "Invalid No source Id Passed",
                });
            }
            await cloudinary.delete(sourceId);

            return res.status(204).json({
                success: true,
                message: "Successfully Deleted Uploaded Asset",
                data: null
            });
        }catch (err){
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    
    }
       

    static async deleteMedia(req, res) {
        try {
            const { mediaId } = req.params;
            const  {sourceId} = req.body;
            
            const media = await new MediaRepo().getMediaById(mediaId);
           if(!media){
            return res.status(400).json({
                success: false,
                message: "Invalid Media ID Provided",
            });
           }
            let mediaSource = JSON.parse(media.source);
            
            if (!sourceId && mediaId){
                if (typeof(mediaSource) === "string"){
                    console.log("Do NOthing")
                }else{
                   for (const ele of mediaSource) {
                        await cloudinary.delete(ele.id);
                    } 
                }
                
                 await new MediaRepo().deleteMedia(mediaId);
            }else{
                let updatedSource = mediaSource.filter(ele=> ele.id != sourceId);
                let removedImage = await cloudinary.delete(sourceId);
                if(removedImage){
                    media.source =JSON.stringify(updatedSource);
                    const media = await new MediaRepo().updateMedia(mediaId, media);
                }  
            }

            return res.status(204).json({
                success: true,
                message: "Successfully Deleted Media",
                data: null
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    static async shareMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            const { friendIds, source } = req.body;
            const { id: userId } = req.user;
            let mediaCount = 0;
            
            if (!friendIds.length)return res.status(400).json({
                success: false,
                message: "Please Pass at least one friendId in the friendIds list",
            });


            for (let friendId of friendIds){
                const friend = await new UserRepo().getById(friendId);

                if (!friend)return res.status(400).json({
                    success: false,
                    message: "Invalid UserId Passed For friend",
                });
    
                if (userId === friendId) return res.status(400).json({
                    success: false,
                    message: "User cannot share media with itself.",
                });

                const media = await new MediaRepo().createMedia({
                    source: JSON.stringify(source),
                    userId: friendId,
                    senderId: userId
                });
    
                if (!media)
                    return res.status(400).json({
                        success: false,
                        message: "Media cannot be shared.",
                    });
                mediaCount += 1;
                const notificationType = 2;
                const initiatorId = userId;
                const recipientId = friendId;
                const notificationData = media;
                await NotificationsController.createNotification({ notificationType, initiatorId, recipientId, notificationData });
            }
        return res.status(201).json({
                success: true,
                message: "Successfully Shared Media",
                data: mediaCount,
            });
        })(request, response);
    }

    static async acceptMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            // const { id: userId } = req.user;
            const { mediaId } = req.params;
            const { mediaTypeId } = req.body;
            const media = await new MediaRepo().updateMedia(mediaId, { mediaTypeId });

            res.status(200).json({
                success: true,
                message: "Media Successfully Added to Profile",
                data: media,
            });
        })(request, response);
    }

    static async getMediaApprovalRequests(request, response) {
        return asyncWrapper(async(req, res) => {
            const { id: userId } = req.user;

            const mediaApprovalRequests = await new MediaRepo().findAllMediaApprovalRequests(userId);
            for (const ele in mediaApprovalRequests){
                let approvalInfo = {...mediaApprovalRequests[ele].dataValues}
                const senderProfile = await new UserRepo().getUserProfileById(approvalInfo.senderId)
                mediaApprovalRequests[ele].dataValues.senderProfile = senderProfile;
            }

            res.status(200).json({
                success: true,
                message: "Media Approval requests",
                data: mediaApprovalRequests,
            });
        })(request, response);
    }

    static async createComment(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;
            const { textContent } = req.body;
            const { id: userId } = req.user;

            const createdComment = await new CommentRepo().createComment({
                mediaId,
                userId,
                textContent,
            });

            if (!createdComment.comment)
                return res.status(400).json({
                    success: false,
                    message: "Comment cannot be created.",
                });

            const notificationType = 3;
            const initiatorId = userId;
            const recipientId = createdComment.media.userId;
            const { id, blocId, source } = createdComment.media;
            const notificationData = {
                blocId,
                mediaId: id,
                source
            }

            if (recipientId !== initiatorId) {
                await NotificationsController.createNotification({ notificationType, initiatorId, recipientId, notificationData });
            }


            res.status(201).json({
                success: true,
                message: "Comment successfully created",
                data: createdComment.comment,
            });
        })(request, response);
    }

    static async getComments(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;
            const { page } = req.query;

            const mediaComments = await new CommentRepo().getComments(mediaId, page);

            res.status(200).json({
                success: true,
                message: `Comments for media with id ${mediaId}`,
                data: mediaComments,
            });
        })(request, response);
    }

    static async getCommentsCount(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;

            const mediaCommentsCount = await new CommentRepo().getCommentsCount(mediaId);

            res.status(200).json({
                success: true,
                message: `Number of comments for media with id ${mediaId}`,
                data: mediaCommentsCount,
            });
        })(request, response);
    }

    static async getMediaViewsCount(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;

            const mediaViewsCount = await new MediaRepo().getMediaViewsCount(mediaId);

            res.status(200).json({
                success: true,
                message: `Number of views for media with id ${mediaId}`,
                data: mediaViewsCount,
            });
        })(request, response);
    }

    static async bookmarkMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;
            const { id: userId } = req.user

            const bookmarkedMedia = await new MediaRepo().bookmarkMedia(userId, mediaId);

            res.status(200).json({
                success: true,
                message: `Media has been bookmarked Succesfully`,
                data: bookmarkedMedia,
            });
        })(request, response);
    }

    static async unBookmarkMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            const { mediaId } = req.params;
            const { id: userId } = req.user

            const unBookmarkedMedia = await new MediaRepo().unBookmarkMedia(userId, mediaId);

            res.status(200).json({
                success: true,
                message: `Media has been unbookmarked Succesfully`,
                data: unBookmarkedMedia,
            });
        })(request, response);
    }

    static async getUserBookmarkedMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            const { page } = req.query;
            const { userId } = req.params;

            const listBookmarkedMedia = await new MediaRepo().getUserBookmarkedMedia(userId, page);
            res.status(200).json({
                success: true,
                message: `List of bookmarked Medias`,
                data: listBookmarkedMedia,
            });
        })(request, response);
    }
}



module.exports = MediaController;