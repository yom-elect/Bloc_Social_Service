/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const {
    body,
    query,
    validationResult,
    param
} = require("express-validator");
const validationError = require("./validationError");

class UserAccountValidation {
    static async registerAccountValidator(req, res, next) {
        await body("email")
            .notEmpty()
            .withMessage("Email field is required")
            .trim()
            .isEmail()
            .withMessage("Invalid Email Address Entered!")
            .customSanitizer((email) => email.toLowerCase())
            .run(req);
        await body("password")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .isLength({
                min: 8,
                max: 20
            })
            .withMessage("Password should be between 8 to 20 Characters")
            .run(req);
        await body("confirmPassword")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .equals(req.body.password)
            .withMessage("Both password must be the same")
            .run(req);
        await body("type").isString().withMessage("type must be a string")
            .trim()
            .run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async updateProfilePhotoValidator(req, res, next) {
        await body("source").exists().withMessage("source field is required").run(req)
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async adminDeleteUserValidator(req, res, next) {
        await body("userId").exists().withMessage("user ID is required").run(req)
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async updateUserProfileValidator(req, res, next) {
            await body("username")
                .notEmpty()
                .trim()
                .withMessage("username is Required!")
                .customSanitizer((username) => username.toLowerCase())
                .run(req);
            await body("firstName")
                .notEmpty()
                .withMessage("firstName Field is required")
                .trim()
                .run(req);
            await body("lastName")
                .notEmpty()
                .withMessage("lasttName Field is required")
                .trim()
                .run(req);
            const errors = validationResult(req);

            if (!errors.isEmpty()) return validationError(res, errors.array());

            next();
        }
        // Login Validation
    static async loginAccountValidator(req, res, next) {
        await body("email")
            .notEmpty()
            .withMessage("Email field is required")
            .trim()
            .isEmail()
            .withMessage("Invalid Email Address Entered!")
            .customSanitizer((email) => email.toLowerCase())
            .run(req);

        await body("password")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .isLength({
                min: 5,
                max: 20
            })
            .withMessage("Password should be between 5 to 20 Characters")
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async socialLoginValidator(req, res, next) {
        await body("email")
            .notEmpty()
            .withMessage("Email field is required")
            .trim()
            .isEmail()
            .withMessage("Invalid Email Address Entered!")
            .customSanitizer((email) => email.toLowerCase())
            .run(req)

        await body("socialToken")
            .notEmpty()
            .withMessage("Social Token Field is required")
            .trim()
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }
    static async saveUsernameValidator(req, res, next) {
        await body("username")
            .notEmpty()
            .withMessage("Username field is required")
            .trim()
            .withMessage("Invalid Username Address Entered!")
            .customSanitizer((username) => username.toLowerCase())
            .run(req)
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async getUsernameValidator(req, res, next) {
        await param("username")
            .notEmpty()
            .withMessage("Username field is required")
            .trim()
            .withMessage("Invalid Username Address passed")
            .customSanitizer((username) => username.toLowerCase())
            .run(req)
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async resetPasswordValidator(req, res, next) {
        await body("email")
            .notEmpty()
            .withMessage("Email field is required")
            .trim()
            .isEmail()
            .withMessage("Invalid Email Address Entered!")
            .customSanitizer((email) => email.toLowerCase())
            .run(req);

        await body("password")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .isLength({
                min: 5,
                max: 20
            })
            .withMessage("Password should be between 5 to 20 Characters")
            .run(req);

        await body("confirmPassword")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .equals(req.body.password)
            .withMessage("Both password must be the same")
            .run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }
    static async requestChangePasswordValidator(req, res, next) {
        await body("email")
            .notEmpty()
            .withMessage("Email field is required")
            .trim()
            .isEmail()
            .withMessage("Invalid Email Address Entered!")
            .customSanitizer((email) => email.toLowerCase())
            .run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async validateUserDetailsFieldsOnUpdate(req, res, next) {
        await body("email")
            .isString()
            .withMessage("Email can only be strings")
            .bail()
            .trim()
            .customSanitizer((email) => email.toLowerCase())
            .isEmail()
            .withMessage("Invalid Email address provided")
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async validateUserDetailsFieldsOnAuthentication(req, res, next) {
        await body("email")
            .isString()
            .withMessage("Email can only be strings")
            .bail()
            .trim()
            .customSanitizer((email) => email.toLowerCase())
            .isEmail()
            .withMessage("Invalid Email address provided")
            .run(req);

        await body("password")
            .isString()
            .withMessage("Password can only be strings")
            .bail()
            .isLength({
                min: 5,
                max: 20
            })
            .withMessage("Password should be between 5 to 20 Characters")
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async validatePageNumber(req, res, next) {

        await query('page')
            .isInt({ min: 1 })
            .withMessage('Invalid page number')
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async changePasswordValidator(req, res, next) {
        await body("currentPassword")
            .notEmpty()
            .withMessage("currentPassword is required")
            .trim()
            .isLength({
                min: 8,
                max: 20,
            })
            .withMessage("Password should be between 8 to 20 Characters")
            .run(req);
        await body("newPassword")
            .notEmpty()
            .withMessage(" New Password Field is required")
            .trim()
            .isLength({
                min: 8,
                max: 20
            })
            .withMessage("Password should be between 8 to 20 Characters")
            .run(req);
        await body("confirmPassword")
            .notEmpty()
            .withMessage("Password Field is required")
            .trim()
            .equals(req.body.newPassword)
            .withMessage("Both password must be the same")
            .run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }

    static async refreshTokenValidator(req, res, next) {
        await body("refreshToken")
            .notEmpty()
            .withMessage("Refresh Token field is required")
            .trim()
            .isString()
            .withMessage("Token can only be passed in string format")
            .run(req)
        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }
}

module.exports = UserAccountValidation;