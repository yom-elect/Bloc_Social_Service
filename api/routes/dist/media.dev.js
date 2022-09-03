"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
require("express-validator");

var express = require("express");

var router = express.Router();

var Authorization = require("../middlewares/authorization");

var CommentValidations = require("../middlewares/validations/commentValidation");

var MediaValidations = require("../middlewares/validations/mediaValidation");

var MediaController = require("../controllers/MediaController");

var authenticate = Authorization.authenticate;
var validateCommentFieldsOnCreate = CommentValidations.validateCommentFieldsOnCreate;
var createMediaValidator = MediaValidations.createMediaValidator,
    updateMediaValidator = MediaValidations.updateMediaValidator,
    validateMediaId = MediaValidations.validateMediaId,
    validateHeadline = MediaValidations.validateHeadline,
    validateMediaOnShare = MediaValidations.validateMediaOnShare;
var sourceUpload = MediaController.sourceUpload,
    getMediaById = MediaController.getMediaById,
    getMediaByHeadline = MediaController.getMediaByHeadline,
    createMedia = MediaController.createMedia,
    deleteMedia = MediaController.deleteMedia,
    updateMedia = MediaController.updateMedia,
    shareMedia = MediaController.shareMedia,
    createComment = MediaController.createComment,
    getComments = MediaController.getComments,
    getCommentsCount = MediaController.getCommentsCount,
    getAllUserMediaByMediaType = MediaController.getAllUserMediaByMediaType,
    getMediaViewsCount = MediaController.getMediaViewsCount; // temporary modules

router.use(authenticate);

var upload = require("../services/media/multer");

router.post("/source/upload", upload.array("uploads"), sourceUpload);
router.get("/user/media", getAllUserMediaByMediaType);
router.get("/headline", validateHeadline, getMediaByHeadline);
router.post("/share", validateMediaOnShare, shareMedia);
router.route("/me/:mediaId").patch(updateMediaValidator, updateMedia)["delete"](deleteMedia);
router.get("/:mediaId/comments/count", validateMediaId, getCommentsCount);
router.route("/:mediaId/comments").all(validateMediaId).get(getComments).post(validateCommentFieldsOnCreate, createComment);
router.get("/:mediaId", getMediaById);
router.post("/", createMediaValidator, createMedia);
router.get("/views/count/:mediaId", validateMediaId, getMediaViewsCount);
module.exports = router;