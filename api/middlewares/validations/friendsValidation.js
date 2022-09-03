/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const {body, validationResult} = require("express-validator");
const validationError = require('./validationError');

class FriendsValidation {
    static async validateFriendsFieldsOnCreate (req, res, next)  {
        const UUIDVersion = "4";

        await body('friendId')
            .exists()
            .withMessage('Friend Id field is required')
            .bail()
            .isUUID(UUIDVersion)
            .withMessage('Invalid Friend id')
            .run(req);


        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }
}

module.exports = FriendsValidation;
