"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
var UserRepo = require("../repositories/UserRepo");

var FriendsRepo = require('../repositories/FriendsRepo');

var UsersBlocsRepo = require('../repositories/UsersBlocsRepo');

var UserProfileRepo = require('../repositories/UserProfileRepo');

var NotificationsController = require("./NotificationsController"); // const { UserExists } = require("../helpers/errors");


var asyncWrapper = require("../helpers/asyncWrapper");

var _require = require("../helpers/views"),
    updateMediaViewsTimeine = _require.updateMediaViewsTimeine;

var _require2 = require("../helpers/userRating"),
    calculateUserPoint = _require2.calculateUserPoint;

var EmailService = require("../services/mail");

var UserAccountController =
/*#__PURE__*/
function () {
  function UserAccountController() {
    _classCallCheck(this, UserAccountController);
  }

  _createClass(UserAccountController, null, [{
    key: "storeUsername",
    // Users Profile
    value: function storeUsername(req, res) {
      var userId, profileExists, userProfileExits, userProfile;
      return regeneratorRuntime.async(function storeUsername$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userId = req.user.id;
              _context.next = 4;
              return regeneratorRuntime.awrap(new UserRepo().getUserProfileByUsername(req.body.username));

            case 4:
              profileExists = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(new UserRepo().getUserProfileById(userId));

            case 7:
              userProfileExits = _context.sent;

              if (!(profileExists || userProfileExits)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                success: true,
                message: "This username is already taken / you are unable to create "
              }));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(new UserRepo().addProfile(req.body.username, userId));

            case 12:
              userProfile = _context.sent;
              return _context.abrupt("return", res.status(201).json({
                success: true,
                message: "Profile has been created for user",
                data: userProfile
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                success: false,
                message: _context.t0.message,
                data: req.user.email
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "updateUserProfilePicture",
    value: function updateUserProfilePicture(req, res) {
      var userId, profilePhoto, photo;
      return regeneratorRuntime.async(function updateUserProfilePicture$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              userId = req.user.id;
              profilePhoto = JSON.stringify(req.body.source);
              _context2.next = 5;
              return regeneratorRuntime.awrap(new UserRepo().updateUserProfilePicture(userId, profilePhoto));

            case 5:
              photo = _context2.sent;
              return _context2.abrupt("return", res.status(201).json({
                success: true,
                message: "Successfully Changed Profile Picture",
                data: photo
              }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                success: false,
                message: _context2.t0.message
              }));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "getUserProfileById",
    value: function getUserProfileById(req, res) {
      var id, userProfile;
      return regeneratorRuntime.async(function getUserProfileById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.user.id;

              if (id) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                success: false,
                errors: [{
                  parameter: "email",
                  message: "no account exist for  ".concat(req.id)
                }]
              }));

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(new UserRepo().getUserProfileById(id));

            case 5:
              userProfile = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                success: true,
                message: "successfully fetched profile",
                data: userProfile
              }));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "getProfileByProfileId",
    value: function getProfileByProfileId(req, res) {
      var id, profile;
      return regeneratorRuntime.async(function getProfileByProfileId$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params;

              if (id) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                success: false,
                errors: [{
                  parameter: "id",
                  message: "No Id passed  "
                }]
              }));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(new UserRepo().getProfileByProfileId(id));

            case 5:
              profile = _context4.sent;

              if (profile) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                success: false,
                errors: [{
                  parameter: "Id",
                  message: "No profile for this Id passed "
                }]
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).json({
                success: true,
                message: "successfully fetched profile",
                data: profile
              }));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "updateUserProfile",
    value: function updateUserProfile(req, res) {
      var id, _req$body, username, firstName, lastName, userProfileInfo, userProfile;

      return regeneratorRuntime.async(function updateUserProfile$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.user.id;
              _req$body = req.body, username = _req$body.username, firstName = _req$body.firstName, lastName = _req$body.lastName;
              userProfileInfo = {
                username: username,
                firstName: firstName,
                lastName: lastName
              };
              _context5.next = 5;
              return regeneratorRuntime.awrap(new UserRepo().updateUserProfile(userProfileInfo, id));

            case 5:
              userProfile = _context5.sent;
              return _context5.abrupt("return", res.status(201).json({
                success: true,
                message: "Profile has been updated",
                data: userProfile
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "getUserByUsername",
    value: function getUserByUsername(req, res) {
      var username, userProfile;
      return regeneratorRuntime.async(function getUserByUsername$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              username = req.body.username;
              _context6.next = 4;
              return regeneratorRuntime.awrap(new UserRepo().getUserProfileByUsername(username));

            case 4:
              userProfile = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                success: true,
                message: "successfully fetched profile",
                data: userProfile
              }));

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                success: false,
                message: _context6.t0.message,
                data: req.user.email
              }));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 8]]);
    } // Reset password

  }, {
    key: "requestResetPassword",
    value: function requestResetPassword(req, res) {
      var email, user, userProfile;
      return regeneratorRuntime.async(function requestResetPassword$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              email = req.body.email;
              _context7.next = 3;
              return regeneratorRuntime.awrap(new UserRepo().getByEmail(email));

            case 3:
              user = _context7.sent;

              if (user) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", res.json({
                success: false,
                errors: [{
                  parameter: "email",
                  message: "no account exist with email ".concat(email)
                }]
              }));

            case 6:
              _context7.prev = 6;
              _context7.next = 9;
              return regeneratorRuntime.awrap(new UserRepo().getUserProfileById(user.id));

            case 9:
              userProfile = _context7.sent;
              _context7.next = 12;
              return regeneratorRuntime.awrap(EmailService(user.email, userProfile.username, null, "reset_password"));

            case 12:
              return _context7.abrupt("return", res.json({
                success: true,
                message: "you can reset your password"
              }));

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](6);
              return _context7.abrupt("return", res.json({
                success: false,
                errors: [{
                  parameter: "error",
                  message: "Something went wrong"
                }]
              }));

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[6, 15]]);
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(req, res) {
      var _req$body2, email, password, emailUser;

      return regeneratorRuntime.async(function resetPassword$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context8.next = 3;
              return regeneratorRuntime.awrap(new UserRepo().getByEmail(email));

            case 3:
              emailUser = _context8.sent;

              if (emailUser) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", res.json({
                success: false,
                errors: [{
                  parameter: "email",
                  message: "no account exist with email ".concat(email)
                }]
              }));

            case 6:
              _context8.prev = 6;
              _context8.next = 9;
              return regeneratorRuntime.awrap(new UserRepo().changePassword(email, password));

            case 9:
              return _context8.abrupt("return", res.json({
                success: true,
                message: "password reset successful"
              }));

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](6);
              return _context8.abrupt("return", res.json({
                success: false,
                errors: [{
                  parameter: "error",
                  message: "Something went wrong"
                }]
              }));

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[6, 12]]);
    }
  }, {
    key: "getUserBlocs",
    value: function getUserBlocs(request, response) {
      return regeneratorRuntime.async(function getUserBlocs$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", asyncWrapper(function _callee(req, res) {
                var user, blocs;
                return regeneratorRuntime.async(function _callee$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        user = req.user;
                        _context9.next = 3;
                        return regeneratorRuntime.awrap(new UserRepo().getUserBlocs(user));

                      case 3:
                        blocs = _context9.sent;
                        res.status(200).json({
                          success: true,
                          message: "User blocs",
                          data: blocs
                        });

                      case 5:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "updateUserDetails",
    value: function updateUserDetails(request, response) {
      return regeneratorRuntime.async(function updateUserDetails$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", asyncWrapper(function _callee2(req, res) {
                var email, userId, emailHasBeenTaken, updatedUser;
                return regeneratorRuntime.async(function _callee2$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        email = req.body.email;
                        userId = req.user.id;
                        _context11.next = 4;
                        return regeneratorRuntime.awrap(new UserRepo().getByEmail(email));

                      case 4:
                        emailHasBeenTaken = _context11.sent;

                        if (!emailHasBeenTaken) {
                          _context11.next = 7;
                          break;
                        }

                        return _context11.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Email already in use."
                        }));

                      case 7:
                        _context11.next = 9;
                        return regeneratorRuntime.awrap(new UserRepo().findByIdAndUpdate(userId, {
                          email: email
                        }));

                      case 9:
                        updatedUser = _context11.sent;
                        res.status(200).json({
                          success: true,
                          message: "Updated user details",
                          data: updatedUser[1][0]
                        });

                      case 11:
                      case "end":
                        return _context11.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "getFriendsSuggestion",
    value: function getFriendsSuggestion(request, response) {
      return regeneratorRuntime.async(function getFriendsSuggestion$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", asyncWrapper(function _callee3(req, res) {
                var userId, usersFollowingSameBloc, usersWithSameCountryCode, uniqueUsers, friendsSuggestion;
                return regeneratorRuntime.async(function _callee3$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        userId = req.user.id;
                        _context13.next = 3;
                        return regeneratorRuntime.awrap(new UsersBlocsRepo().findUserIdsFollowingSameBloc(userId));

                      case 3:
                        usersFollowingSameBloc = _context13.sent;
                        _context13.next = 6;
                        return regeneratorRuntime.awrap(new UserProfileRepo().findUserIdsByCountryCode(userId));

                      case 6:
                        usersWithSameCountryCode = _context13.sent;
                        uniqueUsers = new Set();
                        usersWithSameCountryCode.forEach(function (user) {
                          return uniqueUsers.add(user.userId);
                        });
                        usersFollowingSameBloc.forEach(function (user) {
                          return uniqueUsers.add(user.userId);
                        });
                        _context13.next = 12;
                        return regeneratorRuntime.awrap(new UserProfileRepo().findUsersByUserId(Array.from(uniqueUsers)));

                      case 12:
                        friendsSuggestion = _context13.sent;
                        res.status(200).json({
                          success: true,
                          message: 'Friends Suggestion',
                          data: friendsSuggestion
                        });

                      case 14:
                      case "end":
                        return _context13.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      });
    }
  }, {
    key: "followFriend",
    value: function followFriend(request, response) {
      return regeneratorRuntime.async(function followFriend$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", asyncWrapper(function _callee4(req, res) {
                var userId, friendId, friendAlreadyFollowed, friendshipAlreadyCreated, createdFriendship, notificationType, initiatorId, recipientId, notificationData;
                return regeneratorRuntime.async(function _callee4$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        userId = req.user.id;
                        friendId = req.body.friendId;

                        if (!(userId === friendId)) {
                          _context15.next = 4;
                          break;
                        }

                        return _context15.abrupt("return", res.status(400).json({
                          success: false,
                          message: "User cannot follow itself."
                        }));

                      case 4:
                        _context15.next = 6;
                        return regeneratorRuntime.awrap(new FriendsRepo().checkFriendship(userId, friendId));

                      case 6:
                        friendAlreadyFollowed = _context15.sent;

                        if (!friendAlreadyFollowed) {
                          _context15.next = 9;
                          break;
                        }

                        return _context15.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Friendship already created."
                        }));

                      case 9:
                        _context15.next = 11;
                        return regeneratorRuntime.awrap(new FriendsRepo().checkFriendship(friendId, userId));

                      case 11:
                        friendshipAlreadyCreated = _context15.sent;

                        if (!friendshipAlreadyCreated) {
                          _context15.next = 19;
                          break;
                        }

                        friendshipAlreadyCreated.isPending = false;
                        _context15.next = 16;
                        return regeneratorRuntime.awrap(new FriendsRepo().saveFriendship(friendshipAlreadyCreated));

                      case 16:
                        createdFriendship = _context15.sent;
                        _context15.next = 28;
                        break;

                      case 19:
                        _context15.next = 21;
                        return regeneratorRuntime.awrap(new FriendsRepo().followFriend(userId, friendId));

                      case 21:
                        createdFriendship = _context15.sent;
                        notificationType = 1;
                        initiatorId = userId;
                        recipientId = friendId;
                        notificationData = {};
                        _context15.next = 28;
                        return regeneratorRuntime.awrap(NotificationsController.createNotification({
                          notificationType: notificationType,
                          initiatorId: initiatorId,
                          recipientId: recipientId,
                          notificationData: notificationData
                        }));

                      case 28:
                        if (createdFriendship) {
                          _context15.next = 30;
                          break;
                        }

                        return _context15.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Friendship cannot be created."
                        }));

                      case 30:
                        res.status(200).json({
                          success: true,
                          message: "Friendship created",
                          data: createdFriendship
                        });

                      case 31:
                      case "end":
                        return _context15.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  }, {
    key: "getFriendRequests",
    value: function getFriendRequests(request, response) {
      return regeneratorRuntime.async(function getFriendRequests$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", asyncWrapper(function _callee5(req, res) {
                var userId, friendRequests;
                return regeneratorRuntime.async(function _callee5$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        userId = req.user.id;
                        _context17.next = 3;
                        return regeneratorRuntime.awrap(new FriendsRepo().findAllFriendRequests(userId));

                      case 3:
                        friendRequests = _context17.sent;
                        res.status(200).json({
                          success: true,
                          message: "Friend requests",
                          data: friendRequests
                        });

                      case 5:
                      case "end":
                        return _context17.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      });
    }
  }, {
    key: "unfollowFriend",
    value: function unfollowFriend(request, response) {
      return regeneratorRuntime.async(function unfollowFriend$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", asyncWrapper(function _callee6(req, res) {
                var userId, friendId, userFollowedFriend, friendFollowedUser;
                return regeneratorRuntime.async(function _callee6$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        userId = req.user.id;
                        friendId = req.body.friendId;

                        if (!(userId === friendId)) {
                          _context19.next = 4;
                          break;
                        }

                        return _context19.abrupt("return", res.status(400).json({
                          success: false,
                          message: "User cannot follow itself."
                        }));

                      case 4:
                        _context19.next = 6;
                        return regeneratorRuntime.awrap(new FriendsRepo().checkFriendship(userId, friendId));

                      case 6:
                        userFollowedFriend = _context19.sent;
                        _context19.next = 9;
                        return regeneratorRuntime.awrap(new FriendsRepo().checkFriendship(friendId, userId));

                      case 9:
                        friendFollowedUser = _context19.sent;

                        if (!(!userFollowedFriend && !friendFollowedUser)) {
                          _context19.next = 12;
                          break;
                        }

                        return _context19.abrupt("return", res.status(400).json({
                          success: false,
                          message: "There is no relationship between user with id ".concat(userId, " and user with id ").concat(friendId)
                        }));

                      case 12:
                        if (!userFollowedFriend) {
                          _context19.next = 15;
                          break;
                        }

                        _context19.next = 15;
                        return regeneratorRuntime.awrap(new FriendsRepo().unfollowFriend(userFollowedFriend));

                      case 15:
                        if (!friendFollowedUser) {
                          _context19.next = 18;
                          break;
                        }

                        _context19.next = 18;
                        return regeneratorRuntime.awrap(new FriendsRepo().unfollowFriend(friendFollowedUser));

                      case 18:
                        res.status(204).send();

                      case 19:
                      case "end":
                        return _context19.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context20.stop();
          }
        }
      });
    }
  }, {
    key: "activateUser",
    value: function activateUser(request, response) {
      return regeneratorRuntime.async(function activateUser$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", asyncWrapper(function _callee7(req, res) {
                var _req$body3, email, password, userId, user, updatedUser;

                return regeneratorRuntime.async(function _callee7$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
                        userId = req.user.id;
                        _context21.next = 4;
                        return regeneratorRuntime.awrap(new UserRepo().findByCredentials(email, password));

                      case 4:
                        user = _context21.sent;

                        if (user) {
                          _context21.next = 7;
                          break;
                        }

                        return _context21.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Invalid Email/Password combination."
                        }));

                      case 7:
                        if (!(user.id !== userId)) {
                          _context21.next = 9;
                          break;
                        }

                        return _context21.abrupt("return", res.status(403).json({
                          success: false,
                          message: "You are not allowed to perform this operation."
                        }));

                      case 9:
                        if (!user.isActive) {
                          _context21.next = 11;
                          break;
                        }

                        return _context21.abrupt("return", res.status(400).json({
                          success: false,
                          message: "You are already active."
                        }));

                      case 11:
                        _context21.next = 13;
                        return regeneratorRuntime.awrap(new UserRepo().findByIdAndUpdate(userId, {
                          isActive: 1
                        }));

                      case 13:
                        updatedUser = _context21.sent;

                        if (!(updatedUser[0] === 0)) {
                          _context21.next = 16;
                          break;
                        }

                        return _context21.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Your account no longer exists. Register to continue."
                        }));

                      case 16:
                        _context21.next = 18;
                        return regeneratorRuntime.awrap(EmailService(user.email, user.profile.username, null, "activate_user", {
                          username: user.profile.username
                        }));

                      case 18:
                        res.status(200).json({
                          success: true,
                          message: "Updated user details",
                          data: updatedUser[1][0]
                        });

                      case 19:
                      case "end":
                        return _context21.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      });
    }
  }, {
    key: "deactivateUser",
    value: function deactivateUser(request, response) {
      return regeneratorRuntime.async(function deactivateUser$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", asyncWrapper(function _callee8(req, res) {
                var _req$body4, email, password, userId, user, updatedUser;

                return regeneratorRuntime.async(function _callee8$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password;
                        userId = req.user.id;
                        _context23.next = 4;
                        return regeneratorRuntime.awrap(new UserRepo().findByCredentials(email, password));

                      case 4:
                        user = _context23.sent;

                        if (user) {
                          _context23.next = 7;
                          break;
                        }

                        return _context23.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Invalid Email/Password combination."
                        }));

                      case 7:
                        if (!(user.id !== userId)) {
                          _context23.next = 9;
                          break;
                        }

                        return _context23.abrupt("return", res.status(403).json({
                          success: false,
                          message: "You are not allowed to perform this operation."
                        }));

                      case 9:
                        if (user.isActive) {
                          _context23.next = 11;
                          break;
                        }

                        return _context23.abrupt("return", res.status(400).json({
                          success: false,
                          message: "You are already deactivated."
                        }));

                      case 11:
                        _context23.next = 13;
                        return regeneratorRuntime.awrap(new UserRepo().findByIdAndUpdate(userId, {
                          isActive: 0
                        }));

                      case 13:
                        updatedUser = _context23.sent;

                        if (!(updatedUser[0] === 0)) {
                          _context23.next = 16;
                          break;
                        }

                        return _context23.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Your account no longer exists. Register to continue."
                        }));

                      case 16:
                        _context23.next = 18;
                        return regeneratorRuntime.awrap(EmailService(user.email, user.profile.username, null, "deactivate_user", {
                          username: user.profile.username
                        }));

                      case 18:
                        res.status(200).json({
                          success: true,
                          message: "Updated user details",
                          data: updatedUser[1][0]
                        });

                      case 19:
                      case "end":
                        return _context23.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      });
    }
  }, {
    key: "getAllUserFriends",
    value: function getAllUserFriends(req, res) {
      return regeneratorRuntime.async(function getAllUserFriends$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", asyncWrapper(function _callee9(req, res) {
                var id, _req$query, sortParam, order, friends;

                return regeneratorRuntime.async(function _callee9$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        id = req.user.id;
                        _req$query = req.query, sortParam = _req$query.sortParam, order = _req$query.order;
                        _context25.next = 4;
                        return regeneratorRuntime.awrap(new FriendsRepo().getAllUserFriends(id, sortParam, order));

                      case 4:
                        friends = _context25.sent;
                        res.status(200).json({
                          success: true,
                          message: "All friends success",
                          data: friends
                        });

                      case 6:
                      case "end":
                        return _context25.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context26.stop();
          }
        }
      });
    }
  }, {
    key: "getUserTimeline",
    value: function getUserTimeline(req, res) {
      return regeneratorRuntime.async(function getUserTimeline$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", asyncWrapper(function _callee10(req, res) {
                var id, timeline;
                return regeneratorRuntime.async(function _callee10$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        id = req.user.id;
                        _context27.next = 3;
                        return regeneratorRuntime.awrap(new UserRepo().getUserTimeline(id));

                      case 3:
                        timeline = _context27.sent;
                        updateMediaViewsTimeine(timeline, id);
                        res.status(200).json({
                          success: true,
                          message: "User Bloc TimeLine",
                          data: timeline
                        });

                      case 6:
                      case "end":
                        return _context27.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context28.stop();
          }
        }
      });
    }
  }, {
    key: "getUserFriendsFeeds",
    value: function getUserFriendsFeeds(req, res) {
      return regeneratorRuntime.async(function getUserFriendsFeeds$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", asyncWrapper(function _callee11(req, res) {
                var id, timeline;
                return regeneratorRuntime.async(function _callee11$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        id = req.user.id;
                        _context29.next = 3;
                        return regeneratorRuntime.awrap(new UserRepo().getUserFriendsFeeds(id));

                      case 3:
                        timeline = _context29.sent;
                        updateMediaViewsTimeine(timeline, id);
                        res.status(200).json({
                          success: true,
                          message: "User Friends Feeds",
                          data: timeline
                        });

                      case 6:
                      case "end":
                        return _context29.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context30.stop();
          }
        }
      });
    }
  }, {
    key: "getUserRankData",
    value: function getUserRankData(req, res) {
      return regeneratorRuntime.async(function getUserRankData$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              return _context32.abrupt("return", asyncWrapper(function _callee12(req, res) {
                var id, userData, ratingData, response;
                return regeneratorRuntime.async(function _callee12$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        id = req.user.id;
                        _context31.next = 3;
                        return regeneratorRuntime.awrap(new UserRepo().allUserData(id));

                      case 3:
                        userData = _context31.sent;
                        ratingData = calculateUserPoint(JSON.stringify(userData[0]));
                        _context31.next = 7;
                        return regeneratorRuntime.awrap(new UserProfileRepo().updateUserProfileRating(id, ratingData.currentRank));

                      case 7:
                        response = _context31.sent;
                        res.status(200).json({
                          success: true,
                          message: "User Point",
                          data: ratingData
                        });

                      case 9:
                      case "end":
                        return _context31.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context32.stop();
          }
        }
      });
    }
  }]);

  return UserAccountController;
}();

module.exports = UserAccountController;