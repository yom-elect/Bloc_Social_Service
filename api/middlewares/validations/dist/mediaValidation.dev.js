"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var _require = require("express-validator"),
    param = _require.param,
    query = _require.query,
    body = _require.body,
    validationResult = _require.validationResult;

var validationError = require("./validationError");

var MediaValidation =
/*#__PURE__*/
function () {
  function MediaValidation() {
    _classCallCheck(this, MediaValidation);
  }

  _createClass(MediaValidation, null, [{
    key: "createMediaValidator",
    value: function createMediaValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function createMediaValidator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(body("caption").exists().withMessage("caption field is required").isString().withMessage("caption can only be strings").trim() //   .customSanitizer((captionInput) => captionInput.toLowerCase())
              .isLength({
                min: 2,
                max: 1000
              }).withMessage("Caption must be between 2 to 1000 characters").run(req));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(body("headline").exists().withMessage("headline field is required").isString().withMessage("headline can only be strings").trim() //   .customSanitizer((captionInput) => captionInput.toLowerCase())
              .isLength({
                min: 2,
                max: 50
              }).withMessage("Headline must be between 2 to 50 characters").run(req));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(body("mediaTypeId").exists().withMessage("mediaTypeId field is required").isInt().withMessage("mediaTypeId can only be integer").run(req));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(body("blocId").exists().withMessage("blocId field is required").isInt().withMessage("blocId can only be integer").run(req));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(body("source").exists().withMessage("source field is required").run(req));

            case 10:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", validationError(res, errors.array()));

            case 13:
              next();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "updateMediaValidator",
    value: function updateMediaValidator(req, res, next) {
      var _req$body, caption, headline, errors;

      return regeneratorRuntime.async(function updateMediaValidator$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, caption = _req$body.caption, headline = _req$body.headline;

              if (!(!caption && !headline)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                success: false,
                message: "Either caption or headline field must be provided"
              }));

            case 3:
              if (!caption) {
                _context2.next = 6;
                break;
              }

              _context2.next = 6;
              return regeneratorRuntime.awrap(body("caption").exists().withMessage("caption field is required").bail().isString().withMessage("caption can only be strings").bail().trim() //   .customSanitizer((captionInput) => captionInput.toLowerCase())
              .isLength({
                min: 2,
                max: 1000
              }).withMessage("Caption must be between 2 to 1000 characters").run(req));

            case 6:
              if (!headline) {
                _context2.next = 9;
                break;
              }

              _context2.next = 9;
              return regeneratorRuntime.awrap(body("headline").exists().withMessage("headline field is required").bail().isString().withMessage("headline can only be strings").bail().trim().isLength({
                min: 2,
                max: 50
              }).withMessage("Headline must be between 2 to 50 characters").run(req));

            case 9:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", validationError(res, errors.array()));

            case 12:
              next();

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "validateMediaId",
    value: function validateMediaId(req, res, next) {
      var UUIDVersion, errors;
      return regeneratorRuntime.async(function validateMediaId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              UUIDVersion = "4";
              _context3.next = 3;
              return regeneratorRuntime.awrap(param("mediaId").exists().withMessage("Media Id field is required").bail().isUUID(UUIDVersion).withMessage("Invalid Media id").run(req));

            case 3:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", validationError(res, errors.array()));

            case 6:
              next();

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "validateHeadline",
    value: function validateHeadline(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function validateHeadline$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(query("headline").isString().withMessage("Headline can only be strings").bail().trim().isLength({
                min: 1,
                max: 50
              }).withMessage("Headline must be between 2 to 50 characters").run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "validateMediaOnShare",
    value: function validateMediaOnShare(req, res, next) {
      var UUIDVersion, errors;
      return regeneratorRuntime.async(function validateMediaOnShare$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              UUIDVersion = "4";
              _context5.next = 3;
              return regeneratorRuntime.awrap(body("source").exists().withMessage("Source field is required").bail().isString().withMessage("Source can only be strings").bail().trim().isLength({
                max: 255
              }).withMessage("source url must be less than 255 characters").bail().isURL().withMessage("Bloc images url is invalid").run(req));

            case 3:
              _context5.next = 5;
              return regeneratorRuntime.awrap(body("friendId").exists().withMessage("Friend Id field is required").bail().isUUID(UUIDVersion).withMessage("Invalid Friend id").run(req));

            case 5:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", validationError(res, errors.array()));

            case 8:
              next();

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }]);

  return MediaValidation;
}();

module.exports = MediaValidation;