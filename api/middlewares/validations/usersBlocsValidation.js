const {body, validationResult} = require("express-validator");
const { isInt } = require('validator');
const validationError = require('./validationError');

class UsersBlocsValidation {
    static async validateUsersBlocsFieldsOnCreate (req, res, next) {

            await body('blocIds')
                .exists()
                .withMessage('Bloc Ids field is required')
                .bail()
                .isArray()
                .withMessage('Bloc Ids can only be an array of strings')
                .bail()
                .isLength({ min: 1 })
                .withMessage("Bloc Ids can't be empty")
                .bail()
                .custom(stringArray => stringArray.every(stringElement => isInt(stringElement, {gt: 0})))
                .withMessage('Invalid bloc ids')
                .run(req);


            const errors = validationResult(req);

            if (!errors.isEmpty()) return validationError(res, errors.array());

            next();
    }
}

module.exports = UsersBlocsValidation;
