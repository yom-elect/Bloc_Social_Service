"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable linebreak-style */

/* eslint-disable camelcase */

/* eslint-disable comma-dangle */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */

/**
 * third party libraries
 */
var Sequelize = require("sequelize");

var UserProfile =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(UserProfile, _Sequelize$Model);

  function UserProfile() {
    _classCallCheck(this, UserProfile);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserProfile).apply(this, arguments));
  }

  _createClass(UserProfile, null, [{
    key: "associate",
    value: function associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
      });
      this.hasMany(models.Comments, {
        as: "comments",
        foreignKey: "userId",
        onDelete: "CASCADE",
        sourceKey: "userId"
      });
    }
  }, {
    key: "modelInit",
    value: function modelInit(sequelize) {
      var model = this.init(this.modelFields, {
        tableName: this.tablename,
        sequelize: sequelize,
        timestamps: false
      });
      return model;
    }
  }, {
    key: "findUserByPhoneNumber",
    value: function findUserByPhoneNumber(phoneNumber, countryCode) {
      var user;
      return regeneratorRuntime.async(function findUserByPhoneNumber$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  phoneNumber: phoneNumber,
                  countryCode: countryCode
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }));

            case 2:
              user = _context.sent;
              return _context.abrupt("return", user && user.toJSON());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUserByUsername",
    value: function findUserByUsername(username) {
      var user;
      return regeneratorRuntime.async(function findUserByUsername$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  username: username
                },
                include: [{
                  model: this.sequelize.models.User,
                  as: "user",
                  attributes: {
                    exclude: ["createdAt", "updatedAt", "password", "accountType"]
                  }
                }]
              }));

            case 2:
              user = _context2.sent;
              return _context2.abrupt("return", user);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    } // Profile picture will be removed , testing purpose alone

  }, {
    key: "addUserProfile",
    value: function addUserProfile(username, userId) {
      var userProfile;
      return regeneratorRuntime.async(function addUserProfile$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.create({
                // profilePicture:
                //   "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/music_bvuykx.jpg",
                username: username,
                userId: userId
              }));

            case 2:
              userProfile = _context3.sent;
              return _context3.abrupt("return", userProfile && userProfile.toJSON());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateUserProfilePicture",
    value: function updateUserProfilePicture(userId, profilePhoto) {
      var response;
      return regeneratorRuntime.async(function updateUserProfilePicture$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.update({
                profilePicture: profilePhoto
              }, {
                where: {
                  userId: userId
                }
              }));

            case 2:
              response = _context4.sent;
              return _context4.abrupt("return", response);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateUserProfileRating",
    value: function updateUserProfileRating(userId, rating) {
      var response;
      return regeneratorRuntime.async(function updateUserProfileRating$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.update({
                starRating: rating
              }, {
                where: {
                  userId: userId
                }
              }));

            case 2:
              response = _context5.sent;
              return _context5.abrupt("return", response);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateUserProfile",
    value: function updateUserProfile(userProfileInfo, userId) {
      var response;
      return regeneratorRuntime.async(function updateUserProfile$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.update({
                userProfileInfo: userProfileInfo
              }, {
                where: {
                  userId: userId
                }
              }));

            case 2:
              response = _context6.sent;
              return _context6.abrupt("return", response);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getByUserId",
    value: function getByUserId(id) {
      var userProfile;
      return regeneratorRuntime.async(function getByUserId$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  userId: id
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }));

            case 2:
              userProfile = _context7.sent;
              return _context7.abrupt("return", userProfile && userProfile.toJSON());

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getByProfileId",
    value: function getByProfileId(id) {
      var userProfile;
      return regeneratorRuntime.async(function getByProfileId$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  id: id
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }));

            case 2:
              userProfile = _context8.sent;
              return _context8.abrupt("return", userProfile && userProfile.toJSON());

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUsersByUserId",
    value: function findUsersByUserId(userIdList) {
      return regeneratorRuntime.async(function findUsersByUserId$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  userId: userIdList
                },
                attributes: ['username', 'profilePicture']
              }));

            case 2:
              return _context9.abrupt("return", _context9.sent);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUserIdsByCountryCode",
    value: function findUserIdsByCountryCode(userId) {
      return regeneratorRuntime.async(function findUserIdsByCountryCode$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  countryCode: _defineProperty({}, Sequelize.Op.eq, Sequelize.literal("(SELECT \"countryCode\" FROM \"USER_PROFILE\" AS \"UserProfile\" WHERE \"UserProfile\".\"userId\" = '".concat(userId, "')"))),
                  userId: _defineProperty({}, Sequelize.Op.ne, userId)
                },
                attributes: ['userId']
              }));

            case 2:
              return _context10.abrupt("return", _context10.sent);

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }]);

  return UserProfile;
}(Sequelize.Model);

UserProfile.tablename = "USER_PROFILE";
UserProfile.modelFields = {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  username: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING(50),
    unique: true
  },
  firstName: {
    type: Sequelize.DataTypes.STRING(50)
  },
  lastName: {
    type: Sequelize.DataTypes.STRING(50)
  },
  countryCode: {
    type: Sequelize.DataTypes.STRING(3)
  },
  phoneNumber: {
    type: Sequelize.DataTypes.STRING(10)
  },
  userId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    references: {
      model: "USERS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  profilePicture: {
    type: Sequelize.DataTypes.STRING
  },
  starRating: {
    type: Sequelize.DataTypes.TINYINT
  },
  userLocation: {
    type: Sequelize.DataTypes.STRING
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  }
};
exports["default"] = UserProfile;