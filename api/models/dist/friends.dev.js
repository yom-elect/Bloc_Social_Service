"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Friends =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(Friends, _Sequelize$Model);

  function Friends() {
    _classCallCheck(this, Friends);

    return _possibleConstructorReturn(this, _getPrototypeOf(Friends).apply(this, arguments));
  }

  _createClass(Friends, [{
    key: "unfollowFriend",
    value: function unfollowFriend() {
      return regeneratorRuntime.async(function unfollowFriend$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.destroy());

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "saveFriendship",
    value: function saveFriendship() {
      return regeneratorRuntime.async(function saveFriendship$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.save());

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "associate",
    value: function associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "friendId"
      });
    }
  }, {
    key: "modelInit",
    value: function modelInit(sequelize) {
      var model = this.init(this.modelFields, {
        tableName: this.tablename,
        sequelize: sequelize
      });
      return model;
    }
  }, {
    key: "followFriend",
    value: function followFriend(userId, friendId) {
      var createdFriendship;
      return regeneratorRuntime.async(function followFriend$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.create({
                userId: userId,
                friendId: friendId,
                isPending: true
              }));

            case 3:
              createdFriendship = _context3.sent;
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              createdFriendship = null;

            case 9:
              return _context3.abrupt("return", createdFriendship);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: "getAllUserFriends",
    value: function getAllUserFriends(userId) {
      var sortParam,
          order,
          friends,
          _args4 = arguments;
      return regeneratorRuntime.async(function getAllUserFriends$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sortParam = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : "name";
              order = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : "ASC";
              friends = this.getFriends({
                where: {
                  userId: userId
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                include: [{
                  model: this.sequelize.models.User,
                  as: "friends",
                  order: [["".concat(sortParam), "".concat(order)]],
                  attributes: {
                    exclude: ["createdAt", "updatedAt", "password", "accountType"]
                  }
                }]
              });
              return _context4.abrupt("return", friends);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "checkFriendship",
    value: function checkFriendship(userId, friendId) {
      return regeneratorRuntime.async(function checkFriendship$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.findOne({
                where: {
                  userId: userId,
                  friendId: friendId
                }
              }));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findAllFriendRequests",
    value: function findAllFriendRequests(userId) {
      return regeneratorRuntime.async(function findAllFriendRequests$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  friendId: userId,
                  isPending: true
                }
              }));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Friends;
}(Sequelize.Model);

Friends.tablename = "FRIENDS";
Friends.modelFields = {
  friendId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    references: {
      model: "USERS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    references: {
      model: "USERS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  isPending: {
    allowNull: false,
    type: Sequelize.DataTypes.BOOLEAN
  }
};
exports["default"] = Friends;