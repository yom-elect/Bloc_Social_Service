/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */

require("express-validator");
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const CommentValidations = require("../middlewares/validations/commentValidation");
const MediaValidations = require("../middlewares/validations/mediaValidation");
const MediaController = require("../controllers/MediaController");

const {
    authenticate
} = Authorization;

const {
    validateCommentFieldsOnCreate
} = CommentValidations;
const {
    createMediaValidator,
    updateMediaValidator,
    validateMediaId,
    validateHeadline,
    validateMediaOnShare,
} = MediaValidations;

const {
    sourceUpload,
    getMediaById,
    getMediaByHeadline,
    createMedia,
    deleteMedia,
    updateMedia,
    acceptMedia,
    shareMedia,
    createComment,
    getComments,
    getCommentsCount,
    getAllUserMediaByMediaType,
    getMediaViewsCount,
    bookmarkMedia,
    unBookmarkMedia,
    getUserBookmarkedMedia,
    deleteSource
} = MediaController;
// temporary modules

router.use(authenticate);

const upload = require("../services/media/multer");
router.post("/source/upload", upload.array("uploads"), sourceUpload);
router.get("/user/media", getAllUserMediaByMediaType);
router.get("/headline", validateHeadline, getMediaByHeadline);
router.post("/share", validateMediaOnShare, shareMedia);
router
    .route("/me/:mediaId")
    .patch(updateMediaValidator, updateMedia)
    .delete(deleteMedia);
router.patch("/accept/:mediaId", acceptMedia);
router.get("/:mediaId/comments/count", validateMediaId, getCommentsCount);
router
    .route("/:mediaId/comments")
    .all(validateMediaId)
    .get(getComments)
    .post(validateCommentFieldsOnCreate, createComment);
router.get("/:mediaId", getMediaById);
router.post("/", createMediaValidator, createMedia);
router.get("/views/count/:mediaId", validateMediaId, getMediaViewsCount);

router.post("/bookmark/media/:mediaId", bookmarkMedia);
router.delete("/unbookmark/media/:mediaId", unBookmarkMedia);
router.get("/bookmarked/media/:userId", getUserBookmarkedMedia);
router.delete("/source/delete", deleteSource);

module.exports = router;