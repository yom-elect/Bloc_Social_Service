"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable indent */

/* eslint-disable lines-between-class-members */

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var validationError = require("./validationError");

var UserAccountValidation =
/*#__PURE__*/
function () {
  function UserAccountValidation() {
    _classCallCheck(this, UserAccountValidation);
  }

  _createClass(UserAccountValidation, null, [{
    key: "registerAccountValidator",
    value: function registerAccountValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function registerAccountValidator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(body("email").notEmpty().withMessage("Email field is required").trim().isEmail().withMessage("Invalid Email Address Entered!").customSanitizer(function (email) {
                return email.toLowerCase();
              }).run(req));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(body("password").notEmpty().withMessage("Password Field is required").trim().isLength({
                min: 5,
                max: 20
              }).withMessage("Password should be between 5 to 20 Characters").run(req));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(body("confirmPassword").notEmpty().withMessage("Password Field is required").trim().equals(req.body.password).withMessage("Both password must be the same").run(req));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(body("type").isString().withMessage("type must be a string").trim().run(req));

            case 8:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", validationError(res, errors.array()));

            case 11:
              next();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "updateProfilePhotoValidator",
    value: function updateProfilePhotoValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function updateProfilePhotoValidator$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(body("source").exists().withMessage("source field is required").run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "adminDeleteUserValidator",
    value: function adminDeleteUserValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function adminDeleteUserValidator$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(body("userId").exists().withMessage("user ID is required").run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "updateUserProfileValidator",
    value: function updateUserProfileValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function updateUserProfileValidator$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(body("username").notEmpty().trim().withMessage("username is Required!").customSanitizer(function (username) {
                return username.toLowerCase();
              }).run(req));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(body("firstName").notEmpty().withMessage("firstName Field is required").trim().run(req));

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(body("lastName").notEmpty().withMessage("lasttName Field is required").trim().run(req));

            case 6:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", validationError(res, errors.array()));

            case 9:
              next();

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      });
    } // Login Validation

  }, {
    key: "loginAccountValidator",
    value: function loginAccountValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function loginAccountValidator$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(body("email").notEmpty().withMessage("Email field is required").trim().isEmail().withMessage("Invalid Email Address Entered!").customSanitizer(function (email) {
                return email.toLowerCase();
              }).run(req));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(body("password").notEmpty().withMessage("Password Field is required").trim().isLength({
                min: 5,
                max: 20
              }).withMessage("Password should be between 5 to 20 Characters").run(req));

            case 4:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", validationError(res, errors.array()));

            case 7:
              next();

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "socialLoginValidator",
    value: function socialLoginValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function socialLoginValidator$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(body("email").notEmpty().withMessage("Email field is required").trim().isEmail().withMessage("Invalid Email Address Entered!").customSanitizer(function (email) {
                return email.toLowerCase();
              }).run(req));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(body("socialToken").notEmpty().withMessage("Social Token Field is required").trim().run(req));

            case 4:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", validationError(res, errors.array()));

            case 7:
              next();

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "saveUsernameValidator",
    value: function saveUsernameValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function saveUsernameValidator$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(body("username").notEmpty().withMessage("Username field is required").trim().withMessage("Invalid Username Address Entered!").customSanitizer(function (username) {
                return username.toLowerCase();
              }).run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context7.next = 5;
                break;
              }

              return _context7.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "resetPasswordValidator",
    value: function resetPasswordValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function resetPasswordValidator$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(body("email").notEmpty().withMessage("Email field is required").trim().isEmail().withMessage("Invalid Email Address Entered!").customSanitizer(function (email) {
                return email.toLowerCase();
              }).run(req));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(body("password").notEmpty().withMessage("Password Field is required").trim().isLength({
                min: 5,
                max: 20
              }).withMessage("Password should be between 5 to 20 Characters").run(req));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(body("confirmPassword").notEmpty().withMessage("Password Field is required").trim().equals(req.body.password).withMessage("Both password must be the same").run(req));

            case 6:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context8.next = 9;
                break;
              }

              return _context8.abrupt("return", validationError(res, errors.array()));

            case 9:
              next();

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }, {
    key: "requestChangePasswordValidator",
    value: function requestChangePasswordValidator(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function requestChangePasswordValidator$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(body("email").notEmpty().withMessage("Email field is required").trim().isEmail().withMessage("Invalid Email Address Entered!").customSanitizer(function (email) {
                return email.toLowerCase();
              }).run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "validateUserDetailsFieldsOnUpdate",
    value: function validateUserDetailsFieldsOnUpdate(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function validateUserDetailsFieldsOnUpdate$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(body("email").isString().withMessage("Email can only be strings").bail().trim().customSanitizer(function (email) {
                return email.toLowerCase();
              }).isEmail().withMessage("Invalid Email address provided").run(req));

            case 2:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return", validationError(res, errors.array()));

            case 5:
              next();

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "validateUserDetailsFieldsOnAuthentication",
    value: function validateUserDetailsFieldsOnAuthentication(req, res, next) {
      var errors;
      return regeneratorRuntime.async(function validateUserDetailsFieldsOnAuthentication$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(body("email").isString().withMessage("Email can only be strings").bail().trim().customSanitizer(function (email) {
                return email.toLowerCase();
              }).isEmail().withMessage("Invalid Email address provided").run(req));

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(body("password").isString().withMessage("Password can only be strings").bail().isLength({
                min: 5,
                max: 20
              }).withMessage("Password should be between 5 to 20 Characters").run(req));

            case 4:
              errors = validationResult(req);

              if (errors.isEmpty()) {
                _context11.next = 7;
                break;
              }

              return _context11.abrupt("return", validationError(res, errors.array()));

            case 7:
              next();

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }]);

  return UserAccountValidation;
}();

module.exports = UserAccountValidation;