/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const PushValidations = require("../middlewares/validations/pushValidation");
const PushController = require("../controllers/PushController")

const {
    authenticate,
    // authorizeAdmin
} = Authorization;

const {
    validatePushTokenId
} = PushValidations;

const {
    registerPushNotification,
    updatePushNotification,
    deletePushNotification
} = PushController;

router
    .route('/:pushTokenId')
    .all(validatePushTokenId)
    .patch(updatePushNotification)
    .get(authenticate, updatePushNotification)
    .delete(authenticate, deletePushNotification);
router
  .route("/register")
  .post(registerPushNotification);

module.exports = router;
