"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Models = require("../models");

var UserProfile = Models.UserProfile;

var UserProfileRepo =
/*#__PURE__*/
function () {
  function UserProfileRepo() {
    _classCallCheck(this, UserProfileRepo);
  }

  _createClass(UserProfileRepo, [{
    key: "findUsersByUserId",
    value: function findUsersByUserId(userIdList) {
      return regeneratorRuntime.async(function findUsersByUserId$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(UserProfile.findUsersByUserId(userIdList));

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
    key: "findUserIdsByCountryCode",
    value: function findUserIdsByCountryCode(userId) {
      return regeneratorRuntime.async(function findUserIdsByCountryCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(UserProfile.findUserIdsByCountryCode(userId));

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
    key: "updateUserProfileRating",
    value: function updateUserProfileRating(userId, rating) {
      return regeneratorRuntime.async(function updateUserProfileRating$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(UserProfile.updateUserProfileRating(userId, rating));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return UserProfileRepo;
}();

module.exports = UserProfileRepo;