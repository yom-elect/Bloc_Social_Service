/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */

const Models = require("../models");

const { User, UserProfile, UsersBlocs } = Models;
const bcryptService = require("../services/bcrypt.service");

class UserRepo {
    async getById(id) {
        return await User.findUserById(id);
    }

    async getByEmail(email) {
        return await User.findUserByEmail(email);
    }

    async createUser(email, password, type) {
        return await User.newUser(email, password, type);
    }

    async removeUser(email) {
        return await User.removeUser(email);
    }

    async adminDeleteUser(userId) {
        return await User.adminDeleteUser(userId);
    }

    async updateUserProfilePicture(userId, profilePhoto) {
        return await UserProfile.updateUserProfilePicture(userId, profilePhoto);
    }

    async addProfile(username, id) {
        const user = await User.findUserById(id);
        if (!user) {
            throw new Error(`user does not exist`);
        }
        return await UserProfile.addUserProfile(username, id);
    }

    async loginSocialUser(email, socialToken) {
        const user = await User.findUserProfileByEmail(email);
        if (!user) {
            await User.newSocialUser(email, socialToken);
            const newUser = await User.findUserProfileByEmail(email);
            return newUser;
        }
        return user;
    }

    async loginUser(email, password) {
        // findUserProfileByEmail
        // const user = await User.findUserByEmail(email)
        const user = await User.findUserProfileByEmail(email)
        if (!user) {
            throw new Error(`Invalid Username and/or Password`)
        }
        const isValidPassword = await bcryptService().comparePassword(
            password,
            user.password,
        )
        if (!isValidPassword) {
            throw new Error("Invalid Username and/or Password")
        }
        if (!user.isActive) {
            throw new Error(
                "Your account is inactive. Please contact an administrator.",
            )
        }
        return user
    }

    async getUserProfileById(id) {
        return await UserProfile.getByUserId(id);
    }

    async getUserProfileByUsername(username) {
        return await UserProfile.findUserByUsername(username);
    }

    async changePassword(email, password) {
        return await User.updateUserPassword(email, {
            password: await bcryptService().generatePassword(password),
        });
    }

    async getProfileByProfileId(id) {
        return await UserProfile.getByProfileId(id);
    }

    async updateUserProfile(userProfileInfo, userId) {
        return await UserProfile.updateUserProfile(userProfileInfo, userId);
    }

    async getUserTimelineNested(userId) {
        return await UsersBlocs.getUserTimeline(userId);
    }

    async getUserTimeline(userId, page) {
        return await User.getUserBlocTimeline(userId, page);
    }

    async getUserFriendsFeeds(userId, page) {
        return await User.getUserFriendsFeeds(userId, page);
    }

    async getFriendsSuggestion(userId, page) {
        return await User.getFriendsSuggestion(userId, page);
    }

    async getUserBlocs(user) {
        return await User.build(user).getUserBlocs();
    }

    async findByIdAndUpdate(userId, newValues) {
        return await User.findByIdAndUpdate(userId, newValues);
    }

    async findByCredentials(email, password) {
        return await User.findByCredentials(email, password);
    }

    async allUserData(userId) {
        return await User.allUserData(userId);
    }
}

module.exports = UserRepo;