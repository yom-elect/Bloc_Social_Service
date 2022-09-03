/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */

const UserRepo = require("../repositories/UserRepo");

const FriendsRepo = require('../repositories/FriendsRepo');
// const UsersBlocsRepo = require('../repositories/UsersBlocsRepo');
const UserProfileRepo = require('../repositories/UserProfileRepo');
const NotificationsController = require("./NotificationsController");
const BcryptService = require("../services/bcrypt.service");
const asyncWrapper = require("../helpers/asyncWrapper");
const { updateMediaViewsTimeine } = require("../helpers/views");
const { calculateUserPoint } = require("../helpers/userRating");
const EmailService = require("../services/mail");

const { comparePassword } = BcryptService();

class UserAccountController {
    // Users Profile
    static async storeUsername(req, res) {
        try {
            const userId = req.user.id;

            const profileExists = await new UserRepo().getUserProfileByUsername(
                req.body.username,
            );

            const userProfileExits = await new UserRepo().getUserProfileById(userId);
            if (profileExists || userProfileExits) {
                return res.status(200).json({
                    success: false,
                    message: "This username is already taken / you are unable to create ",
                });
            }
            const userProfile = await new UserRepo().addProfile(
                req.body.username,
                userId,
            );
            return res.status(201).json({
                success: true,
                message: "Profile has been created for user",
                data: userProfile,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
                data: req.user.email,
            });
        }
    }

    static async updateUserProfilePicture(req, res) {
        try {
            const userId = req.user.id;
            const profilePhoto = JSON.stringify(req.body.source);
            const photo = await new UserRepo().updateUserProfilePicture(userId, profilePhoto);
            return res.status(201).json({
                success: true,
                message: "Successfully Changed Profile Picture",
                data: photo,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
    static async getUserProfileById(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    errors: [
                        {
                            parameter: "email",
                            message: `no account exist for  ${id}`,
                        },
                    ],
                });
            }
            const userProfile = await new UserRepo().getUserProfileById(id);
            return res.status(200).json({
                success: true,
                message: "successfully fetched profile",
                data: userProfile,
            });
        })(req, res);
    }

    static async getProfileByProfileId(req, res) {
        const id = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        parameter: "id",
                        message: `No Id passed  `,
                    },
                ],
            });
        }
        const profile = await new UserRepo().getProfileByProfileId(id);
        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        parameter: "Id",
                        message: `No profile for this Id passed `,
                    },
                ],
            });
        }
        return res.status(200).json({
            success: true,
            message: "successfully fetched profile",
            data: profile,
        });
    }

    static async updateUserProfile(req, res) {
        const {
            id,
        } = req.user;
        const {
            username,
            firstName,
            lastName,
        } = req.body;
        const userProfileInfo = {
            username,
            firstName,
            lastName,
        };
        const userProfile = await new UserRepo().updateUserProfile(
            userProfileInfo,
            id,
        );
        return res.status(201).json({
            success: true,
            message: "Profile has been updated",
            data: userProfile,
        });
    }

    static async getUserByUsername(req, res) {
        try {
            const { id: userId } = req.user;
            const {
                username,
            } = req.params;

            const {
                friends,
            } = req.query;

            const {
                sortParam,
                order,
            } = req.query;

            let userProfile = null;

            if (friends) {
                userProfile = await new FriendsRepo().getUserFriendsByUsername(username, userId, sortParam, order);
            } else {
                userProfile = await new UserRepo().getUserProfileByUsername(
                    username,
                );
            }

            return res.status(200).json({
                success: true,
                message: "successfully fetched profile",
                data: userProfile,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
                data: req.user.email,
            });
        }
    }

    // Reset password
    static async requestResetPassword(req, res) {
        const {
            email,
        } = req.body;
        const user = await new UserRepo().getByEmail(email);
        if (!user) {
            return res.json({
                success: false,
                errors: [
                    {
                        parameter: "email",
                        message: `no account exist with email ${email}`,
                    },
                ],
            });
        }
        try {
            const userProfile = await new UserRepo().getUserProfileById(user.id);
            // comment out to test as Emailing hasn't been fully configured by admin
            EmailService(
                user.email,
                userProfile.username,
                null,
                "reset_password",
            );
            return res.json({
                success: true,
                message: "you can reset your password",
                data: userProfile.username,

            });
        } catch (err) {
            return res.json({
                success: false,
                errors: [
                    {
                        parameter: "error",
                        message: `Something went wrong`,
                    },
                ],
            });
        }
    }

    static async resetPassword(req, res) {
        const {
            email,
            password,
        } = req.body;
        const emailUser = await new UserRepo().getByEmail(email);
        if (!emailUser) {
            return res.json({
                success: false,
                errors: [
                    {
                        parameter: "email",
                        message: `no account exist with email ${email}`,
                    },
                ],
            });
        }
        try {
            await new UserRepo().changePassword(email, password);
            return res.json({
                success: true,
                message: "password reset successful",
            });
        } catch (err) {
            return res.json({
                success: false,
                errors: [
                    {
                        parameter: "error",
                        message: `Something went wrong`,
                    },
                ],
            });
        }
    }

    static async changeUserPassword(request, response) {
        return asyncWrapper(async (req, res) => {
            const { email, password } = req.user;
            const {
                currentPassword,
                newPassword,
            } = req.body;
            const validCurrentPassword = await comparePassword(currentPassword, password);
            if (!validCurrentPassword) {
                return res.json({
                    success: false,
                    message: "Current Password is not Valid",
                });
            }
            await new UserRepo().changePassword(email, newPassword);
            return res.json({
                success: true,
                message: "password changed successful",
            });
        })(request, response);
    }


    static async getUserBlocs(request, response) {
        return asyncWrapper(async (req, res) => {
            const { user } = req;

            const blocs = await new UserRepo().getUserBlocs(user);

            res.status(200).json({
                success: true,
                message: "User blocs",
                data: blocs,
            });
        })(request, response);
    }

    static async updateUserDetails(request, response) {
        return asyncWrapper(async (req, res) => {
            const {
                email,
            } = req.body;
            const { id: userId } = req.user;

            const emailHasBeenTaken = await new UserRepo().getByEmail(email);

            if (emailHasBeenTaken) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use.",
                });
            }

            const updatedUser = await new UserRepo().findByIdAndUpdate(userId, {
                email,
            });

            res.status(200).json({
                success: true,
                message: "Updated user details",
                data: updatedUser[1][0],
            });
        })(request, response);
    }

    static async getUserTimeline(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;
            const { page } = req.query;
            const timeline = await new UserRepo().getUserTimeline(id, page);
            updateMediaViewsTimeine(timeline, id);
            res.status(200).json({
                success: true,
                message: "User Bloc TimeLine",
                data: timeline,
            });
        })(req, res);
    }

    static async getFriendsSuggestion(request, response) {
        return asyncWrapper(async (req, res) => {
            const { id: userId } = req.user;
            const { page } = req.query;

            const friendsSuggestion = await new UserRepo().getFriendsSuggestion(userId, page);

            res.status(200).json({
                success: true,
                message: 'Friends Suggestion',
                data: friendsSuggestion,
            });
        })(request, response);
    }

    static async followFriend(request, response) {
        return asyncWrapper(async (req, res) => {
            const { id: userId } = req.user;
            const { friendId } = req.body;

            const friendData = await new UserRepo().getById(friendId);

            if (!friendData) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Friend Id Passed.",
                });
            }

            if (userId === friendId) {
                return res.status(400).json({
                    success: false,
                    message: "User cannot follow itself.",
                });
            }


            const friendAlreadyFollowed = await new FriendsRepo().checkFriendship(
                userId,
                friendId,
            );

            if (friendAlreadyFollowed) {
                return res.status(400).json({
                    success: false,
                    message: "Friendship already created.",
                });
            }

            const friendshipAlreadyCreated = await new FriendsRepo().checkFriendship(
                friendId,
                userId,
            );

            let createdFriendship;

            if (friendshipAlreadyCreated) {
                friendshipAlreadyCreated.isPending = false;
                createdFriendship = await new FriendsRepo().saveFriendship(
                    friendshipAlreadyCreated,
                );
            } else {
                createdFriendship = await new FriendsRepo().followFriend(
                    userId,
                    friendId,
                );

                const notificationType = 1;
                const initiatorId = userId;
                const recipientId = friendId;
                const notificationData = {};

                await NotificationsController.createNotification({
                    notificationType, initiatorId, recipientId, notificationData,
                });
            }

            if (!createdFriendship) {
                return res.status(400).json({
                    success: false,
                    message: "Friendship cannot be created.",
                });
            }

            res.status(200).json({
                success: true,
                message: "Friendship created",
                data: createdFriendship,
            });
        })(request, response);
    }

    static async getFriendRequests(request, response) {
        return asyncWrapper(async (req, res) => {
            const { id: userId } = req.user;
            const { page } = req.query;

            const friendRequests = await new FriendsRepo().findAllFriendRequests(userId, page);

            res.status(200).json({
                success: true,
                message: "Friend requests",
                data: friendRequests,
            });
        })(request, response);
    }

    static async unfollowFriend(request, response) {
        return asyncWrapper(async (req, res) => {
            const { id: userId } = req.user;
            const { friendId } = req.body;

            if (userId === friendId) {
                return res.status(400).json({
                    success: false,
                    message: "User cannot follow itself.",
                });
            }

            const userFollowedFriend = await new FriendsRepo().checkFriendship(
                userId,
                friendId,
            );
            const friendFollowedUser = await new FriendsRepo().checkFriendship(
                friendId,
                userId,
            );

            if (!userFollowedFriend && !friendFollowedUser) {
                return res.status(400).json({
                    success: false,
                    message: `There is no relationship between user with id ${userId} and user with id ${friendId}`,
                });
            }

            if (userFollowedFriend) { await new FriendsRepo().unfollowFriend(userFollowedFriend); }

            if (friendFollowedUser) { await new FriendsRepo().unfollowFriend(friendFollowedUser); }

            res.status(204).send();
        })(request, response);
    }

    static async activateUser(request, response) {
        return asyncWrapper(async (req, res) => {
            const {
                email,
                password,
            } = req.body;
            const { id: userId } = req.user;

            const user = await new UserRepo().findByCredentials(email, password);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email/Password combination.",
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to perform this operation.",
                });
            }

            if (user.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "You are already active.",
                });
            }

            const updatedUser = await new UserRepo().findByIdAndUpdate(userId, {
                isActive: 1,
            });

            if (updatedUser[0] === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Your account no longer exists. Register to continue.",
                });
            }

            await EmailService(user.email, user.profile.username, null, "activate_user", { username: user.profile.username });

            res.status(200).json({
                success: true,
                message: "Updated user details",
                data: updatedUser[1][0],
            });
        })(request, response);
    }

    static async deactivateUser(request, response) {
        return asyncWrapper(async (req, res) => {
            const {
                email,
                password,
            } = req.body;
            const { id: userId } = req.user;

            const user = await new UserRepo().findByCredentials(email, password);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email/Password combination.",
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to perform this operation.",
                });
            }

            if (!user.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "You are already deactivated.",
                });
            }

            const updatedUser = await new UserRepo().findByIdAndUpdate(userId, {
                isActive: 0,
            });

            if (updatedUser[0] === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Your account no longer exists. Register to continue.",
                });
            }

            await EmailService(user.email, user.profile.username, null, "deactivate_user", { username: user.profile.username });

            res.status(200).json({
                success: true,
                message: "Updated user details",
                data: updatedUser[1][0],
            });
        })(request, response);
    }

    static async getAllUserFriends(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;

            const {
                sortParam,
                order,
                page,
            } = req.query;
            const friends = await new FriendsRepo().getAllUserFriends(
                id,
                sortParam,
                order,
                page,
            );
            res.status(200).json({
                success: true,
                message: "All friends success",
                data: friends,
            });
        })(req, res);
    }

    static async getUserTimeline(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;
            const { page } = req.query;
            const timeline = await new UserRepo().getUserTimeline(id, page);
            updateMediaViewsTimeine(timeline, id);
            res.status(200).json({
                success: true,
                message: "User Bloc TimeLine",
                data: timeline,
            });
        })(req, res);
    }

    static async getUserFriendsFeeds(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;
            const { page } = req.query;
            const timeline = await new UserRepo().getUserFriendsFeeds(id, page);
            updateMediaViewsTimeine(timeline, id);
            res.status(200).json({
                success: true,
                message: "User Friends Feeds",
                data: timeline,
            });
        })(req, res);
    }

    static async getUserRankData(req, res) {
        return asyncWrapper(async (req, res) => {
            const {
                id,
            } = req.user;
            const userData = await new UserRepo().allUserData(id);
            const ratingData = calculateUserPoint(JSON.stringify(userData[0]));
            await new UserProfileRepo().updateUserProfileRating(id, ratingData.currentRank);
            res.status(200).json({
                success: true,
                message: "User Point",
                data: ratingData,
            });
        })(req, res);
    }
}

module.exports = UserAccountController;
