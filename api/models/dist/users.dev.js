"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable indent */

/* eslint-disable linebreak-style */

/* eslint-disable camelcase */

/* eslint-disable comma-dangle */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */

/**
 * third party libraries
 */
var Sequelize = require("sequelize");

var bcryptService = require("../services/bcrypt.service");

var User =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(User, _Sequelize$Model);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: "getUserBlocs",
    value: function getUserBlocs() {
      return regeneratorRuntime.async(function getUserBlocs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.getBloc({
                joinTableAttributes: [],
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              }));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "associate",
    value: function associate(models) {
      this.hasOne(models.UserProfile, {
        foreignKey: "userId",
        as: "profile"
      });
      this.hasOne(models.PushNotifications, {
        foreignKey: "userId",
        as: "pushNotifications"
      });
      this.belongsToMany(models.Blocs, {
        as: "bloc",
        through: "UsersBlocs",
        foreignKey: "userId",
        otherKey: "blocId"
      });
      this.hasMany(models.Friends, {
        as: "friends",
        foreignKey: "userId"
      });
      this.hasMany(models.Notifications, {
        as: "notification",
        foreignKey: "recipientId"
      });
      this.hasMany(models.Comments, {
        as: "comments",
        foreignKey: "userId"
      });
      this.hasMany(models.Media, {
        as: "media",
        foreignKey: "userId"
      });
      this.hasMany(models.Views, {
        as: "views",
        foreignKey: "userId"
      });
    }
  }, {
    key: "modelInit",
    value: function modelInit(sequelize) {
      var model = this.init(this.modelFields, {
        tableName: this.tablename,
        sequelize: sequelize
      }); // this.beforeCreate(this.beforeCreateHook.bind(this));

      return model;
    }
  }, {
    key: "findUserByEmail",
    value: function findUserByEmail(email) {
      var user;
      return regeneratorRuntime.async(function findUserByEmail$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  email: email
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }));

            case 2:
              user = _context2.sent;
              return _context2.abrupt("return", user && user.toJSON());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUserProfileByEmail",
    value: function findUserProfileByEmail(email) {
      var user;
      return regeneratorRuntime.async(function findUserProfileByEmail$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  email: email
                },
                include: 'profile',
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }));

            case 2:
              user = _context3.sent;
              return _context3.abrupt("return", user && user.toJSON());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUserById",
    value: function findUserById(id) {
      var user;
      return regeneratorRuntime.async(function findUserById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  id: id
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "isActive", "password", "socialToken"]
                }
              }));

            case 2:
              user = _context4.sent;
              return _context4.abrupt("return", user && user.toJSON());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "newUser",
    value: function newUser(email, password) {
      var accountType,
          user,
          _args5 = arguments;
      return regeneratorRuntime.async(function newUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              accountType = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : "user";
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.create({
                email: email,
                password: password,
                accountType: accountType,
                isActive: 1
              }));

            case 3:
              user = _context5.sent;
              return _context5.abrupt("return", user);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "newSocialUser",
    value: function newSocialUser(email, socialToken) {
      var accountType,
          user,
          _args6 = arguments;
      return regeneratorRuntime.async(function newSocialUser$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              accountType = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : "user";
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.create({
                email: email,
                accountType: accountType,
                socialToken: socialToken,
                isActive: 1
              }));

            case 3:
              user = _context6.sent;
              return _context6.abrupt("return", user);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "adminDeleteUser",
    value: function adminDeleteUser(userId) {
      var response;
      return regeneratorRuntime.async(function adminDeleteUser$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.destroy({
                where: {
                  id: userId
                }
              }));

            case 2:
              response = _context7.sent;
              return _context7.abrupt("return", response);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "removeUser",
    value: function removeUser(email) {
      var response;
      return regeneratorRuntime.async(function removeUser$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.destroy({
                where: {
                  email: email
                }
              }));

            case 2:
              response = _context8.sent;
              return _context8.abrupt("return", response);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateUserPassword",
    value: function updateUserPassword(email, info) {
      var user;
      return regeneratorRuntime.async(function updateUserPassword$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.update(info, {
                where: {
                  email: email
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt', "isActive", "password", "socialToken"]
                }
              }));

            case 2:
              user = _context9.sent;
              return _context9.abrupt("return", user);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findByCredentials",
    value: function findByCredentials(email, password) {
      var user, isPasswordValid;
      return regeneratorRuntime.async(function findByCredentials$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.findUserProfileByEmail(email));

            case 2:
              user = _context10.sent;

              if (user) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return", null);

            case 5:
              _context10.next = 7;
              return regeneratorRuntime.awrap(bcryptService().comparePassword(password, user.password));

            case 7:
              isPasswordValid = _context10.sent;

              if (isPasswordValid) {
                _context10.next = 10;
                break;
              }

              return _context10.abrupt("return", null);

            case 10:
              return _context10.abrupt("return", user);

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAllUserMediaByMediaType",
    value: function getAllUserMediaByMediaType(userId, mediaTypeId) {
      var allMedia;
      return regeneratorRuntime.async(function getAllUserMediaByMediaType$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  id: userId
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "isActive", "password", "email", "accountType"]
                },
                include: [{
                  model: this.sequelize.models.Media,
                  as: "media",
                  where: {
                    mediaTypeId: mediaTypeId
                  },
                  attributes: {
                    exclude: ["userId", "blocId"]
                  }
                }]
              }));

            case 2:
              allMedia = _context11.sent;
              return _context11.abrupt("return", allMedia);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "allUserData",
    value: function allUserData(userId) {
      var userData;
      return regeneratorRuntime.async(function allUserData$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  id: userId
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "isActive", "password", "email", "accountType", "socialToken"],
                  include: [[Sequelize.literal("(\n                    SELECT COUNT(*)\n                    FROM \"FRIENDS\" AS \"Friends\"\n                    WHERE\n                        \"Friends\".\"userId\" = \"User\".\"id\"\n                        AND\n                        \"Friends\".\"isPending\" = false\n                )"), "friendsCount"], [Sequelize.literal("(\n                    SELECT COUNT(*)\n                    FROM \"VIEWS\" AS \"Views\"\n                    WHERE\n                        \"Views\".\"userId\" = \"User\".\"id\"\n                )"), "viewsCount"], [Sequelize.literal("(\n                    SELECT COUNT(*)\n                    FROM \"MEDIAS\" AS \"Media\"\n                    WHERE\n                        \"Media\".\"userId\" = \"User\".\"id\"\n                )"), "mediasCount"], [Sequelize.literal("(\n                    SELECT COUNT(*)\n                    FROM \"COMMENTS\" AS \"Comments\"\n                    WHERE\n                        \"Comments\".\"userId\" = \"User\".\"id\"\n                )"), "commentsCount"], [Sequelize.literal("(\n                     SELECT COUNT(*) FROM \"USERS\" AS \"User\" LEFT OUTER JOIN \"MEDIAS\" AS \"media\" ON \"User\".\"id\" = \"media\".\"userId\" \n                    JOIN \"COMMENTS\" AS \"comments\" ON \"media\".\"id\" = \"comments\".\"mediaId\" WHERE\n                    '".concat(userId, "'   LIKE '%' || \"media\".\"userId\" || '%'\n                )")), "commentsInteraction"], [Sequelize.literal("(\n                     SELECT COUNT(*) FROM \"USERS\" AS \"User\" LEFT OUTER JOIN \"MEDIAS\" AS \"media\" ON \"User\".\"id\" = \"media\".\"userId\" \n                    JOIN \"VIEWS\" AS \"Views\" ON \"media\".\"id\" = \"Views\".\"mediaId\" WHERE\n                    '".concat(userId, "'   LIKE '%' || \"media\".\"userId\" || '%'\n                )")), "viewsInteraction"]]
                }
              }));

            case 2:
              userData = _context12.sent;
              return _context12.abrupt("return", userData);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAllUserFriends",
    value: function getAllUserFriends(userId, sortParam, order) {
      var friends;
      return regeneratorRuntime.async(function getAllUserFriends$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  id: userId
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "isActive", "password", "email", "accountType", "socialToken"]
                },
                include: [{
                  model: this.sequelize.models.Friends,
                  as: "friends",
                  where: {
                    isPending: false
                  },
                  order: [["".concat(sortParam), "".concat(order)]],
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  },
                  include: [{
                    model: this.sequelize.models.User,
                    as: "user",
                    attributes: {
                      exclude: ["createdAt", "updatedAt", "isActive", "password", "email", "accountType", "socialToken"]
                    },
                    include: [{
                      model: this.sequelize.models.UserProfile,
                      as: "profile",
                      attributes: {
                        exclude: ["createdAt", "updatedAt", "phoneNumber", "countryCode"]
                      }
                    }]
                  }]
                }]
              }));

            case 2:
              friends = _context13.sent;
              return _context13.abrupt("return", friends);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findByIdAndUpdate",
    value: function findByIdAndUpdate(id, newValues) {
      return regeneratorRuntime.async(function findByIdAndUpdate$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this.update(newValues, {
                where: {
                  id: id
                },
                returning: ['id'].concat(_toConsumableArray(Object.keys(newValues)))
              }));

            case 2:
              return _context14.abrupt("return", _context14.sent);

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserBlocTimeline",
    value: function getUserBlocTimeline(userId) {
      var userTimeline;
      return regeneratorRuntime.async(function getUserBlocTimeline$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.sequelize.query("\n                     SELECT \"Blocs\".\"blocName\",\"media\".*,\"UserProfile\".\"username\",\"UserProfile\".\"profilePicture\" FROM \"USERS\" AS \"Users\"  JOIN \"USER_BLOC\" AS \"UserBloc\" \n                    ON \"Users\".\"id\" = \"UserBloc\".\"userId\"\n                    JOIN \"BLOCS\" As \"Blocs\"\n                    ON \"UserBloc\".\"blocId\" = \"Blocs\".\"id\"\n                    JOIN \"MEDIAS\" AS \"media\" ON \"Blocs\".\"id\" = \"media\".\"blocId\"\n                    JOIN \"USER_PROFILE\" AS \"UserProfile\" ON \"media\".\"userId\" = \"UserProfile\".\"userId\"\n                    WHERE\n                    \"media\".\"mediaTypeId\" = 1  AND\n                    '".concat(userId, "'   LIKE '%' || \"UserBloc\".\"userId\" || '%'\n                    "), {
                type: Sequelize.QueryTypes.SELECT
              }));

            case 2:
              userTimeline = _context15.sent;
              return _context15.abrupt("return", userTimeline);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserFriendsFeeds",
    value: function getUserFriendsFeeds(userId) {
      var userTimeline;
      return regeneratorRuntime.async(function getUserFriendsFeeds$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.sequelize.query("\n                    SELECT \"media\".*,\"UserProfile\".\"username\",\"UserProfile\".\"profilePicture\" FROM \"USERS\" AS \"Users\"  \n                    JOIN \"FRIENDS\" AS \"friends\" ON \"Users\".\"id\" = \"friends\".\"userId\"\n                    JOIN \"USER_PROFILE\" AS \"UserProfile\" ON \"friends\".\"friendId\" = \"UserProfile\".\"userId\"\n                    JOIN \"MEDIAS\" AS \"media\" ON \"friends\".\"friendId\" = \"media\".\"userId\"  WHERE\n                    \"media\".\"mediaTypeId\" = 1  AND\n                    '".concat(userId, "'   LIKE '%' || \"friends\".\"userId\" || '%'\n                    "), {
                type: Sequelize.QueryTypes.SELECT
              }));

            case 2:
              userTimeline = _context16.sent;
              return _context16.abrupt("return", userTimeline);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    }
  }]);

  return User;
}(Sequelize.Model);

User.tablename = "USERS";
User.modelFields = {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  email: {
    type: Sequelize.DataTypes.STRING(150),
    unique: true
  },
  password: {
    type: Sequelize.DataTypes.STRING(255)
  },
  socialToken: {
    type: Sequelize.DataTypes.STRING(255)
  },
  accountType: {
    type: Sequelize.DataTypes.ENUM("admin", "user", "developer")
  },
  isActive: {
    type: Sequelize.DataTypes.TINYINT
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
exports["default"] = User;