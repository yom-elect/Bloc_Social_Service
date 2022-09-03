/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */

const Models = require("../models");
const { Media, User, Views, MediaSaved } = Models;


class MediaRepo {
    async getMediaById(id) {
        return await Media.findMediaById(id);
    }

    async updateMediaViews(mediaId, viewerId) {
        return await Views.updateMediaViews(mediaId, viewerId)
    }

    async getMediaViewsCount(mediaId) {
        return await Views.getMediaViewsCount(mediaId)
    }

    async findByBlocId(blocId, page) {
        return await Media.findByBlocId(blocId, page);
    }

    async findByHeadline(headline) {
        return await Media.findByHeadline(headline);
    }

    async findAllMediaApprovalRequests(userId) {
        return await Media.findAllMediaApprovalRequests(userId);
    }

    async createMedia(mediaInfo) {
        return await Media.createMedia(mediaInfo);
    }

    async updateMedia(mediaId, mediaInfo) {
        return await Media.updateMedia(mediaId, mediaInfo);
    }

    async deleteMedia(mediaId) {
        return await Media.deleteMedia(mediaId);
    }

    async getAllUserMediaByMediaType(userId, mediaTypeId, page) {
        return await User.getAllUserMediaByMediaType(userId, mediaTypeId, page);
    }

    async bookmarkMedia(userId, mediaId) {
        return await MediaSaved.bookmarkMedia(userId, mediaId);
    }

    async unBookmarkMedia(userId, mediaId) {
        return await MediaSaved.unBookmarkMedia(userId, mediaId);
    }

    async getUserBookmarkedMedia(userId, page) {
        return await MediaSaved.getUserBookmarkedMedia(userId, page);
    }
}

module.exports = MediaRepo;