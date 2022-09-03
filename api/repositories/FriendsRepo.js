/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

const Models = require("../models");
const { Friends } = Models;


class FriendsRepo {
    async followFriend(userId, friendId) {
        return await Friends.followFriend(userId, friendId);
    }

    async unfollowFriend(friends) {
        return await friends.unfollowFriend();
    }

    async checkFriendship(userId, friendId) {
        return await Friends.checkFriendship(userId, friendId);
    }

    async saveFriendship(friends) {
        return await friends.saveFriendship();
    }

    async findAllFriendRequests(userId, page) {
        return await Friends.findAllFriendRequests(userId, page);
    }

    async getAllUserFriends(userId, sortParam, order, page) {
        return await Friends.getAllUserFriends(userId, sortParam, order, page);
    }

    async getUserFriendsByUsername(username,userId, sortParam, order){
        return await Friends.getUserFriendsByUsername(username, userId, sortParam, order);
    }
}

module.exports = FriendsRepo;