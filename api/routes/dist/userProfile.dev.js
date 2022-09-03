"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
var express = require("express");

var router = express.Router();

var Authorization = require("../middlewares/authorization");

var UserAccountValidations = require("../middlewares/validations/userAccountValidation");

var UserAccountController = require("../controllers/UserAccountController");

var authenticate = Authorization.authenticate;
var updateUserProfileValidator = UserAccountValidations.updateUserProfileValidator,
    saveUsernameValidator = UserAccountValidations.saveUsernameValidator,
    updateProfilePhotoValidator = UserAccountValidations.updateProfilePhotoValidator;
var updateUserProfile = UserAccountController.updateUserProfile,
    getProfileByProfileId = UserAccountController.getProfileByProfileId,
    getUserProfileById = UserAccountController.getUserProfileById,
    getUserByUsername = UserAccountController.getUserByUsername,
    updateUserProfilePicture = UserAccountController.updateUserProfilePicture,
    getUserRankData = UserAccountController.getUserRankData;
router.use(authenticate);
router.get("/userId/:id", getProfileByProfileId);
router.get("/username", saveUsernameValidator, getUserByUsername);
router.patch("/me/photo", updateProfilePhotoValidator, updateUserProfilePicture);
router.patch("/me", updateUserProfileValidator, updateUserProfile);
router.get("/me", getUserProfileById);
router.get("/me/data", getUserRankData);
module.exports = router;