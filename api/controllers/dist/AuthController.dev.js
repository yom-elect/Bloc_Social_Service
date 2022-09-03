"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var UserRepo = require("../repositories/UserRepo");

var _require = require("../helpers/errors"),
    UserExists = _require.UserExists;

var BcryptService = require("../services/bcrypt.service");

var AuthService = require("../services/auth.service");

var EmailService = require("../services/mail");

var asyncWrapper = require("../helpers/asyncWrapper");

var _BcryptService = BcryptService(),
    generatePassword = _BcryptService.generatePassword;

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "socialLogin",
    value: function socialLogin(req, res) {
      return regeneratorRuntime.async(function socialLogin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", asyncWrapper(function _callee() {
                var _req$body, email, socialToken, user;

                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _req$body = req.body, email = _req$body.email, socialToken = _req$body.socialToken;

                        if (!(!email || !socialToken)) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", res.status(400).json({
                          success: false,
                          errors: [{
                            parameter: "email",
                            message: "No email or token Provided"
                          }]
                        }));

                      case 3:
                        _context.next = 5;
                        return regeneratorRuntime.awrap(new UserRepo().loginSocialUser(email, socialToken));

                      case 5:
                        user = _context.sent;
                        user.token = AuthService().issue(user);

                        if (!user) {
                          _context.next = 11;
                          break;
                        }

                        _context.next = 10;
                        return regeneratorRuntime.awrap(EmailService(user.email, "", null, "welcome"));

                      case 10:
                        return _context.abrupt("return", res.status(201).json({
                          success: true,
                          message: "User created successfully",
                          data: {
                            userId: user.id,
                            email: user.email,
                            accountType: user.accountType,
                            token: user.token
                          }
                        }));

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body2, email, password, user;

      return regeneratorRuntime.async(function login$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

              if (!(!email || !password)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(200).json({
                success: false,
                errors: [{
                  parameter: "email",
                  message: "No email or password Provided"
                }]
              }));

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(new UserRepo().loginUser(email, password));

            case 6:
              user = _context3.sent;
              user.token = AuthService().issue(user);

              if (!user) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(200).json({
                success: true,
                message: "User data",
                data: {
                  userId: user.id,
                  email: user.email,
                  accountType: user.accountType,
                  token: user.token
                }
              }));

            case 10:
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).json({
                success: false,
                message: _context3.t0.message
              }));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }, {
    key: "register",
    value: function register(req, res) {
      var _req$body3, email, password, type, emailUser, hashedPassword, user;

      return regeneratorRuntime.async(function register$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, type = _req$body3.type; // const user = await new UserRepo().removeUser(email);
              // return;

              _context4.next = 4;
              return regeneratorRuntime.awrap(new UserRepo().getByEmail(email));

            case 4:
              emailUser = _context4.sent;

              if (!emailUser) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.json({
                success: false,
                errors: [{
                  parameter: "email",
                  message: new UserExists("Account with email ".concat(email, " already exist on BlocApp")).error
                }]
              }));

            case 7:
              _context4.next = 9;
              return regeneratorRuntime.awrap(generatePassword(password));

            case 9:
              hashedPassword = _context4.sent;
              _context4.next = 12;
              return regeneratorRuntime.awrap(new UserRepo().createUser(email, hashedPassword, type));

            case 12:
              user = _context4.sent;

              if (!user) {
                _context4.next = 17;
                break;
              }

              _context4.next = 16;
              return regeneratorRuntime.awrap(EmailService(user.email, "", null, "welcome"));

            case 16:
              return _context4.abrupt("return", res.status(201).json({
                success: true,
                message: "User created successfully",
                data: null
              }));

            case 17:
              _context4.next = 22;
              break;

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).json({
                success: false,
                error: _context4.t0.message
              }));

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 19]]);
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      var userId, user, response;
      return regeneratorRuntime.async(function deleteUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              userId = req.body.userId;
              _context5.next = 4;
              return regeneratorRuntime.awrap(new UserRepo().getById(userId));

            case 4:
              user = _context5.sent;

              if (!user) {
                _context5.next = 10;
                break;
              }

              _context5.next = 8;
              return regeneratorRuntime.awrap(new UserRepo().adminDeleteUser(userId));

            case 8:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(203).json({
                success: true,
                message: "User deleted successfully",
                data: null
              }));

            case 10:
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).json({
                success: false,
                error: _context5.t0.message
              }));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }]);

  return AuthController;
}();

module.exports = AuthController;