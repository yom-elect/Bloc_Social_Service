/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const {body, param, query, validationResult} = require("express-validator");
const validationError = require('./validationError');

class BlocValidations {
    static async validateBlocFieldsOnCreate (req, res, next) {
      await body('blocName')
          .exists()
          .withMessage("Bloc name field is required")
          .bail()
          .isString()
          .withMessage('Bloc name can only be strings')
          .bail()
          .trim()
          .customSanitizer(blocNameInput => blocNameInput.toLowerCase())
          .isLength({ min: 2, max: 50 })
          .withMessage('Bloc name must be between 2 to 50 characters')
          .run(req);

      await body('blocImage')
          .exists()
          .withMessage("Bloc image field is required")
          .bail()
          .isString()
          .withMessage('Bloc Image can only be strings')
          .bail()
          .trim()
          .isLength({ max: 255 })
          .withMessage('Bloc images url must be less than 255 characters')
          .bail()
          .isURL()
          .withMessage('Bloc images url is invalid')
          .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) return validationError(res, errors.array());

      next();
    }

    static async validateBlocFieldsOnUpdate (req, res, next) {
      const {blocName, blocImage} = req.body;

      if(!blocImage && !blocName) return res.status(400).json({
        success: false,
        message: "Either blocName or blocImage field must be provided"
      });

      if (blocName)
        await body('blocName')
            .isString()
            .withMessage('Bloc name can only be strings')
            .bail()
            .trim()
            .customSanitizer(blocNameInput => blocNameInput.toLowerCase())
            .isLength({ min: 2, max: 50 })
            .withMessage('Bloc name must be between 2 to 50 characters')
            .run(req);

      if (blocImage)
        await body('blocImage')
            .isString()
            .withMessage('Bloc Image can only be strings')
            .bail()
            .trim()
            .isLength({ max: 255 })
            .withMessage('Bloc images url must be less than 255 characters')
            .bail()
            .isURL()
            .withMessage('Bloc images url is invalid')
            .run(req);


      const errors = validationResult(req);

      if (!errors.isEmpty()) return validationError(res, errors.array());

      next();
    }

    static async validateBlocId (req, res, next)  {

      await param('blocId')
        .isInt()
        .withMessage('Invalid bloc id')
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) return validationError(res, errors.array());

      next();
    }

    static async validateBlocName (req, res, next) {

      await query('blocName')
        .isString()
        .withMessage('Bloc name can only be strings')
        .bail()
        .trim()
        .customSanitizer(blocNameInput => blocNameInput.toLowerCase())
        .isLength({ min: 1, max: 50 })
        .withMessage('Bloc name must be between 1 to 50 characters')
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) return validationError(res, errors.array());

      next();
    }
}

module.exports = BlocValidations;
