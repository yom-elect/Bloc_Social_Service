const Models = require("../models");
const { Comments } = Models;


class CommentRepo {
    async getComments(mediaId, page) {
        return await Comments.getComments(mediaId, page);
    }

    async getCommentsCount(mediaId) {
        return await Comments.getCommentsCount(mediaId);
    }

    async createComment(newComment) {
        return await Comments.createComment(newComment);
    }
}

module.exports = CommentRepo;