"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var Models = require("../models");

var User = Models.User,
    UserProfile = Models.UserProfile,
    UsersBlocs = Models.UsersBlocs;

var bcryptService = require("../services/bcrypt.service");

var UserRepo =
/*#__PURE__*/
function () {
  function UserRepo() {
    _classCallCheck(this, UserRepo);
  }

  _createClass(UserRepo, [{
    key: "getById",
    value: function getById(id) {
      return regeneratorRuntime.async(function getById$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(User.findUserById(id));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getByEmail",
    value: function getByEmail(email) {
      return regeneratorRuntime.async(function getByEmail$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(User.findUserByEmail(email));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "createUser",
    value: function createUser(email, password, type) {
      return regeneratorRuntime.async(function createUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(User.newUser(email, password, type));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "removeUser",
    value: function removeUser(email) {
      return regeneratorRuntime.async(function removeUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(User.removeUser(email));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "adminDeleteUser",
    value: function adminDeleteUser(userId) {
      return regeneratorRuntime.async(function adminDeleteUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(User.adminDeleteUser(userId));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "updateUserProfilePicture",
    value: function updateUserProfilePicture(userId, profilePhoto) {
      return regeneratorRuntime.async(function updateUserProfilePicture$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(UserProfile.updateUserProfilePicture(userId, profilePhoto));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "addProfile",
    value: function addProfile(username, id) {
      var user;
      return regeneratorRuntime.async(function addProfile$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(User.findUserById(id));

            case 2:
              user = _context7.sent;

              if (user) {
                _context7.next = 5;
                break;
              }

              throw new Error("user does not exist");

            case 5:
              _context7.next = 7;
              return regeneratorRuntime.awrap(UserProfile.addUserProfile(username, id));

            case 7:
              return _context7.abrupt("return", _context7.sent);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "loginSocialUser",
    value: function loginSocialUser(email, socialToken) {
      var user;
      return regeneratorRuntime.async(function loginSocialUser$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(User.findUserByEmail(email));

            case 2:
              user = _context8.sent;

              if (user) {
                _context8.next = 5;
                break;
              }

              throw new Error("Invalid Username and/or Password");

            case 5:
              _context8.next = 7;
              return regeneratorRuntime.awrap(User.newSocialUser(email, socialToken, type));

            case 7:
              return _context8.abrupt("return", _context8.sent);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(email, password) {
      var user, isValidPassword;
      return regeneratorRuntime.async(function loginUser$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(User.findUserByEmail(email));

            case 2:
              user = _context9.sent;

              if (user) {
                _context9.next = 5;
                break;
              }

              throw new Error("Invalid Username and/or Password");

            case 5:
              _context9.next = 7;
              return regeneratorRuntime.awrap(bcryptService().comparePassword(password, user.password));

            case 7:
              isValidPassword = _context9.sent;

              if (isValidPassword) {
                _context9.next = 10;
                break;
              }

              throw new Error("Invalid Username and/or Password");

            case 10:
              if (user.isActive) {
                _context9.next = 12;
                break;
              }

              throw new Error("Your account is inactive. Please contact an administrator.");

            case 12:
              return _context9.abrupt("return", user);

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "getUserProfileById",
    value: function getUserProfileById(id) {
      return regeneratorRuntime.async(function getUserProfileById$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(UserProfile.getByUserId(id));

            case 2:
              return _context10.abrupt("return", _context10.sent);

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "getUserProfileByUsername",
    value: function getUserProfileByUsername(username) {
      return regeneratorRuntime.async(function getUserProfileByUsername$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(UserProfile.findUserByUsername(username));

            case 2:
              return _context11.abrupt("return", _context11.sent);

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(email, password) {
      return regeneratorRuntime.async(function changePassword$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.t0 = regeneratorRuntime;
              _context12.t1 = User;
              _context12.t2 = email;
              _context12.next = 5;
              return regeneratorRuntime.awrap(bcryptService().generatePassword(password));

            case 5:
              _context12.t3 = _context12.sent;
              _context12.t4 = {
                password: _context12.t3
              };
              _context12.t5 = _context12.t1.updateUserPassword.call(_context12.t1, _context12.t2, _context12.t4);
              _context12.next = 10;
              return _context12.t0.awrap.call(_context12.t0, _context12.t5);

            case 10:
              return _context12.abrupt("return", _context12.sent);

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "getProfileByProfileId",
    value: function getProfileByProfileId(id) {
      return regeneratorRuntime.async(function getProfileByProfileId$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(UserProfile.getByProfileId(id));

            case 2:
              return _context13.abrupt("return", _context13.sent);

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      });
    }
  }, {
    key: "updateUserProfile",
    value: function updateUserProfile(userProfileInfo, userId) {
      return regeneratorRuntime.async(function updateUserProfile$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(UserProfile.updateUserProfile(userProfileInfo, userId));

            case 2:
              return _context14.abrupt("return", _context14.sent);

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      });
    }
  }, {
    key: "getUserTimelineNested",
    value: function getUserTimelineNested(userId) {
      return regeneratorRuntime.async(function getUserTimelineNested$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(UsersBlocs.getUserTimeline(userId));

            case 2:
              return _context15.abrupt("return", _context15.sent);

            case 3:
            case "end":
              return _context15.stop();
          }
        }
      });
    }
  }, {
    key: "getUserTimeline",
    value: function getUserTimeline(userId) {
      return regeneratorRuntime.async(function getUserTimeline$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(User.getUserBlocTimeline(userId));

            case 2:
              return _context16.abrupt("return", _context16.sent);

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  }, {
    key: "getUserFriendsFeeds",
    value: function getUserFriendsFeeds(userId) {
      return regeneratorRuntime.async(function getUserFriendsFeeds$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(User.getUserFriendsFeeds(userId));

            case 2:
              return _context17.abrupt("return", _context17.sent);

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      });
    }
  }, {
    key: "getUserBlocs",
    value: function getUserBlocs(user) {
      return regeneratorRuntime.async(function getUserBlocs$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(User.build(user).getUserBlocs());

            case 2:
              return _context18.abrupt("return", _context18.sent);

            case 3:
            case "end":
              return _context18.stop();
          }
        }
      });
    }
  }, {
    key: "findByIdAndUpdate",
    value: function findByIdAndUpdate(userId, newValues) {
      return regeneratorRuntime.async(function findByIdAndUpdate$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, newValues));

            case 2:
              return _context19.abrupt("return", _context19.sent);

            case 3:
            case "end":
              return _context19.stop();
          }
        }
      });
    }
  }, {
    key: "findByCredentials",
    value: function findByCredentials(email, password) {
      return regeneratorRuntime.async(function findByCredentials$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(User.findByCredentials(email, password));

            case 2:
              return _context20.abrupt("return", _context20.sent);

            case 3:
            case "end":
              return _context20.stop();
          }
        }
      });
    }
  }, {
    key: "allUserData",
    value: function allUserData(userId) {
      return regeneratorRuntime.async(function allUserData$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(User.allUserData(userId));

            case 2:
              return _context21.abrupt("return", _context21.sent);

            case 3:
            case "end":
              return _context21.stop();
          }
        }
      });
    }
  }]);

  return UserRepo;
}();

module.exports = UserRepo;