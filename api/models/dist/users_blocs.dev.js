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

/* eslint-disable indent */

/* eslint-disable no-trailing-spaces */

/* eslint-disable no-return-await */

/* eslint-disable camelcase */

/* eslint-disable comma-dangle */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */

/**
 * third party libraries
 */
var Sequelize = require("sequelize");

var UsersBlocs =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(UsersBlocs, _Sequelize$Model);

  function UsersBlocs() {
    _classCallCheck(this, UsersBlocs);

    return _possibleConstructorReturn(this, _getPrototypeOf(UsersBlocs).apply(this, arguments));
  }

  _createClass(UsersBlocs, null, [{
    key: "associate",
    value: function associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      });
      this.belongsTo(models.Blocs, {
        as: "bloc",
        foreignKey: "blocId"
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
    key: "getUserTimeline",
    value: function getUserTimeline(userId) {
      return regeneratorRuntime.async(function getUserTimeline$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  userId: userId
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "userId"]
                },
                include: [{
                  model: this.sequelize.models.Blocs,
                  as: "bloc",
                  attributes: ['blocName'],
                  include: [{
                    model: this.sequelize.models.Media,
                    as: "medias",
                    where: {
                      mediaTypeId: 1
                    },
                    attributes: {
                      exclude: ["createdAt", "updatedAt", "userId", "mediaTypeId", "blocId"]
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
                }]
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
  }, {
    key: "findUserIdsFollowingSameBloc",
    value: function findUserIdsFollowingSameBloc(userId) {
      return regeneratorRuntime.async(function findUserIdsFollowingSameBloc$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.findAll({
                where: {
                  blocId: _defineProperty({}, Sequelize.Op["in"], Sequelize.literal("(SELECT \"blocId\" FROM \"USER_BLOC\" AS \"UsersBlocs\" WHERE \"UsersBlocs\".\"userId\" = '".concat(userId, "')"))),
                  userId: _defineProperty({}, Sequelize.Op.ne, userId)
                },
                attributes: ['userId']
              }));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "followBloc",
    value: function followBloc(userBlocList) {
      var createdUserBlocs;
      return regeneratorRuntime.async(function followBloc$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.bulkCreate(userBlocList));

            case 3:
              createdUserBlocs = _context3.sent;
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              createdUserBlocs = null;

            case 9:
              return _context3.abrupt("return", createdUserBlocs);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: "unfollowBloc",
    value: function unfollowBloc(userId, blocId) {
      return regeneratorRuntime.async(function unfollowBloc$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.destroy({
                where: {
                  blocId: blocId,
                  userId: userId
                }
              }));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return UsersBlocs;
}(Sequelize.Model);

UsersBlocs.tablename = "USER_BLOC";
UsersBlocs.modelFields = {
  blocId: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,
    references: {
      model: "BLOCS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  userId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    foreignKey: true,
    references: {
      model: "USERS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }
};
exports["default"] = UsersBlocs;