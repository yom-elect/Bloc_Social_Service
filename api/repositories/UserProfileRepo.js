const Models = require("../models");
const { UserProfile } = Models;


class UserProfileRepo {
    async updateUserProfileRating(userId, rating) {
        return await UserProfile.updateUserProfileRating(userId, rating);
    }
}

module.exports = UserProfileRepo;