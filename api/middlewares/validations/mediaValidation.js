/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const {
  param,
  query,
  body,
  validationResult
} = require("express-validator");
const validationError = require("./validationError");

class MediaValidation {
  static async createMediaValidator(req, res, next) {

    await body("caption")
      .exists()
      .withMessage("caption field is required")
      .isString()
      .withMessage("caption can only be strings")
      .trim()
      //   .customSanitizer((captionInput) => captionInput.toLowerCase())
      .isLength({
        min: 2,
        max: 1000
      })
      .withMessage("Caption must be between 2 to 1000 characters")
      .run(req);
    await body("headline")
      .exists()
      .withMessage("headline field is required")
      .isString()
      .withMessage("headline can only be strings")
      .trim()
      //   .customSanitizer((captionInput) => captionInput.toLowerCase())
      .isLength({
        min: 2,
        max: 50
      })
      .withMessage("Headline must be between 2 to 50 characters")
      .run(req);
    await body("mediaTypeId")
      .exists()
      .withMessage("mediaTypeId field is required")
      .isInt()
      .withMessage("mediaTypeId can only be integer")
      .run(req)
    await body("blocId")
      .exists()
      .withMessage("blocId field is required")
      .isInt()
      .withMessage("blocId can only be integer")
      .run(req);
    await body("source").exists().withMessage("source field is required").run(req)
    const errors = validationResult(req);

    if (!errors.isEmpty()) return validationError(res, errors.array());

    next();
  }

  static async updateMediaValidator(req, res, next) {
    const {
      caption,
      headline
    } = req.body;

    if (!caption && !headline)
      return res.status(400).json({
        success: false,
        message: "Either caption or headline field must be provided",
      });

    if (caption) {
      await body("caption")
        .exists()
        .withMessage("caption field is required")
        .bail()
        .isString()
        .withMessage("caption can only be strings")
        .bail()
        .trim()
        //   .customSanitizer((captionInput) => captionInput.toLowerCase())
        .isLength({
          min: 2,
          max: 1000
        })
        .withMessage("Caption must be between 2 to 1000 characters")
        .run(req);
    }


    if (headline) {
      await body("headline")
        .exists()
        .withMessage("headline field is required")
        .bail()
        .isString()
        .withMessage("headline can only be strings")
        .bail()
        .trim()
        .isLength({
          min: 2,
          max: 50
        })
        .withMessage("Headline must be between 2 to 50 characters")
        .run(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) return validationError(res, errors.array());

    next();
  }

  static async validateMediaId(req, res, next) {
    const UUIDVersion = "4";

    await param("mediaId")
      .exists()
      .withMessage("Media Id field is required")
      .bail()
      .isUUID(UUIDVersion)
      .withMessage("Invalid Media id")
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) return validationError(res, errors.array());

    next();
  }

  static async validateHeadline(req, res, next) {
    await query("headline")
      .isString()
      .withMessage("Headline can only be strings")
      .bail()
      .trim()
      .isLength({
        min: 1,
        max: 50
      })
      .withMessage("Headline must be between 2 to 50 characters")
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) return validationError(res, errors.array());

    next();
  }

  static async validateMediaOnShare(req, res, next) {
    const UUIDVersion = "4";

    await body("source")
      .exists()
      .withMessage("Source field is required")
      .run(req);

    await body("friendIds")
      .exists()
      .withMessage("friendIds list field is required")
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) return validationError(res, errors.array());

    next();
  }
}

module.exports = MediaValidation;