"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
var express = require("express");

var router = express.Router();

var Authorization = require("../middlewares/authorization");

var FriendsValidations = require("../middlewares/validations/friendsValidation");

var UserAccountValidations = require("../middlewares/validations/userAccountValidation");

var AuthController = require("../controllers/AuthController");

var UserAccountController = require("../controllers/UserAccountController");

var MediaController = require("../controllers/MediaController");

var NotificationsController = require("../controllers/NotificationsController");

var authenticate = Authorization.authenticate,
    authorizeAdmin = Authorization.authorizeAdmin;
var validateFriendsFieldsOnCreate = FriendsValidations.validateFriendsFieldsOnCreate;
var registerAccountValidator = UserAccountValidations.registerAccountValidator,
    saveUsernameValidator = UserAccountValidations.saveUsernameValidator,
    resetPasswordValidator = UserAccountValidations.resetPasswordValidator,
    requestChangePasswordValidator = UserAccountValidations.requestChangePasswordValidator,
    validateUserDetailsFieldsOnUpdate = UserAccountValidations.validateUserDetailsFieldsOnUpdate,
    validateUserDetailsFieldsOnAuthentication = UserAccountValidations.validateUserDetailsFieldsOnAuthentication,
    adminDeleteUserValidator = UserAccountValidations.adminDeleteUserValidator;
var register = AuthController.register,
    deleteUser = AuthController.deleteUser;
var storeUsername = UserAccountController.storeUsername,
    requestResetPassword = UserAccountController.requestResetPassword,
    resetPassword = UserAccountController.resetPassword,
    getUserBlocs = UserAccountController.getUserBlocs,
    updateUserDetails = UserAccountController.updateUserDetails,
    getFriendsSuggestion = UserAccountController.getFriendsSuggestion,
    getFriendRequests = UserAccountController.getFriendRequests,
    followFriend = UserAccountController.followFriend,
    unfollowFriend = UserAccountController.unfollowFriend,
    activateUser = UserAccountController.activateUser,
    deactivateUser = UserAccountController.deactivateUser,
    getAllUserFriends = UserAccountController.getAllUserFriends,
    getUserTimeline = UserAccountController.getUserTimeline,
    getUserFriendsFeeds = UserAccountController.getUserFriendsFeeds;
var getMediaApprovalRequests = MediaController.getMediaApprovalRequests;
var getAllUnreadNotifications = NotificationsController.getAllUnreadNotifications;
router.post("/signup", registerAccountValidator, register);
router.post("/forgotPassword", requestChangePasswordValidator, requestResetPassword);
router.post("/resetPassword", resetPasswordValidator, resetPassword);
router.use(authenticate);
router.get("/me/timeline", getUserTimeline);
router.get("/friends/feed", getUserFriendsFeeds);
router.post("/username", saveUsernameValidator, storeUsername);
router.get("/friends", getAllUserFriends);
router.post('/follow', validateFriendsFieldsOnCreate, followFriend);
router["delete"]('/unfollow', validateFriendsFieldsOnCreate, unfollowFriend);
router.get('/me/blocs', getUserBlocs);
router.patch('/me/update', validateUserDetailsFieldsOnUpdate, updateUserDetails);
router.patch('/me/activate', validateUserDetailsFieldsOnAuthentication, activateUser);
router.patch('/me/deactivate', validateUserDetailsFieldsOnAuthentication, deactivateUser);
router.get('/me/friendsSuggestion', getFriendsSuggestion);
router.get('/me/notifications', getAllUnreadNotifications);
router.get('/me/friendRequests', getFriendRequests);
router.get('/me/mediaApprovalRequests', getMediaApprovalRequests);
router["delete"]("/admin/deleteuser", authorizeAdmin, adminDeleteUserValidator, deleteUser);
module.exports = router;