/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const FriendsValidations = require("../middlewares/validations/friendsValidation");
const UserAccountValidations = require("../middlewares/validations/userAccountValidation");
const AuthController = require("../controllers/AuthController");
const UserAccountController = require("../controllers/UserAccountController");
const MediaController = require("../controllers/MediaController")
const NotificationsController = require("../controllers/NotificationsController");

const {
    authenticate,
    authorizeAdmin
} = Authorization;

const {
    validateFriendsFieldsOnCreate,
} = FriendsValidations;
const {
    registerAccountValidator,
    saveUsernameValidator,
    resetPasswordValidator,
    requestChangePasswordValidator,
    validateUserDetailsFieldsOnUpdate,
    validateUserDetailsFieldsOnAuthentication,
    validatePageNumber,
    adminDeleteUserValidator,
    changePasswordValidator
} = UserAccountValidations;

const {
    register,
    deleteUser
} = AuthController;
const {
    storeUsername,
    requestResetPassword,
    resetPassword,
    getUserBlocs,
    updateUserDetails,
    getFriendsSuggestion,
    getFriendRequests,
    followFriend,
    unfollowFriend,
    activateUser,
    deactivateUser,
    getAllUserFriends,
    getUserTimeline,
    getUserFriendsFeeds,
    changeUserPassword,
} = UserAccountController;
const {
    getMediaApprovalRequests
} = MediaController;
const {
    getAllUnreadNotifications
} = NotificationsController;


router.post("/signup", registerAccountValidator, register);
router.post("/forgotPassword", requestChangePasswordValidator, requestResetPassword);
router.post("/resetPassword", resetPasswordValidator, resetPassword);


router.use(authenticate);

router.get("/me/timeline", getUserTimeline);
router.get("/friends/feed", getUserFriendsFeeds);

router.post("/username", saveUsernameValidator, storeUsername);
router.get('/me/blocs', getUserBlocs);
router.get('/me/mediaApprovalRequests', getMediaApprovalRequests);

router.get("/friends", getAllUserFriends);
router.post('/follow', validateFriendsFieldsOnCreate, followFriend);
router.delete('/unfollow', validateFriendsFieldsOnCreate, unfollowFriend);


router.patch('/me/update', validateUserDetailsFieldsOnUpdate, updateUserDetails);
router.patch('/me/activate', validateUserDetailsFieldsOnAuthentication, activateUser);
router.patch('/me/deactivate', validateUserDetailsFieldsOnAuthentication, deactivateUser);
router.patch("/me/changePassword", changePasswordValidator, changeUserPassword);

router.get('/me/friendsSuggestion', validatePageNumber, getFriendsSuggestion);
router.get('/me/notifications', getAllUnreadNotifications);
router.get('/me/friendRequests', getFriendRequests);

router.delete("/admin/deleteuser", authorizeAdmin, adminDeleteUserValidator, deleteUser);

module.exports = router;