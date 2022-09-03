const {body, validationResult} = require("express-validator");
const validationError = require('./validationError');

class CommentValidation {
    static async validateCommentFieldsOnCreate (req, res, next) {

        await body('textContent')
            .exists()
            .withMessage("Text content field is required")
            .bail()
            .isString()
            .withMessage('Text content can only be strings')
            .bail()
            .trim()
            .isLength({ min: 1, max:  255})
            .withMessage('Text content must be between 1 to 255 characters')
            .run(req);


        const errors = validationResult(req);

        if (!errors.isEmpty()) return validationError(res, errors.array());

        next();
    }
}

module.exports = CommentValidation;
