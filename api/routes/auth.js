/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const UserAccountValidations = require("../middlewares/validations/userAccountValidation");
const AuthController = require("../controllers/AuthController");

const {
    loginAccountValidator,
    socialLoginValidator,
    refreshTokenValidator,
} = UserAccountValidations;

const {
    login,
    socialLogin,
    generateAccessToken,
} = AuthController;

router.post("/social/signup", socialLoginValidator, socialLogin);
router.post("/login", loginAccountValidator, login);
router.post("/refresh/token", refreshTokenValidator, generateAccessToken);

module.exports = router;

/**
 * postgres://xbqxdtdrvcrblq:418f8ba0b12c4da8f05d7229270b50e09654b660214074f768ae60cf51f5f2de
 * @ec2-18-214-208-89.compute-1.amazonaws.com:5432/dcj4fgbv3nfmjf
 */