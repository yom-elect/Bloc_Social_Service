/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const UserAccountValidations = require("../middlewares/validations/userAccountValidation");
const UserAccountController = require("../controllers/UserAccountController");

const {
    authenticate,
    // authorizeAdmin
} = Authorization;

const {
    updateUserProfileValidator,
    getUsernameValidator,
    updateProfilePhotoValidator
} = UserAccountValidations;

const {
    updateUserProfile,
    getProfileByProfileId,
    getUserProfileById,
    getUserByUsername,
    updateUserProfilePicture,
    getUserRankData,
} = UserAccountController;

router.use(authenticate);

router.get("/userId/:id", getProfileByProfileId);
router.get("/username/:username", getUsernameValidator, getUserByUsername);
router.patch("/me/photo", updateProfilePhotoValidator, updateUserProfilePicture);
router.patch("/me", updateUserProfileValidator, updateUserProfile);
router.get("/me", getUserProfileById);
router.get("/me/rank", getUserRankData);

module.exports = router;