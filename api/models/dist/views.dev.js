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

/* eslint-disable camelcase */

/* eslint-disable comma-dangle */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */

/**
 * third party libraries
 */
var Sequelize = require("sequelize");

var Views =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(Views, _Sequelize$Model);

  function Views() {
    _classCallCheck(this, Views);

    return _possibleConstructorReturn(this, _getPrototypeOf(Views).apply(this, arguments));
  }

  _createClass(Views, null, [{
    key: "associate",
    value: function associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userView",
        foreignKey: "userId"
      });
      this.belongsTo(models.Media, {
        as: "mediaView",
        foreignKey: "mediaId"
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
    key: "getMediaViewsCount",
    value: function getMediaViewsCount(mediaId) {
      return regeneratorRuntime.async(function getMediaViewsCount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.count({
                where: {
                  mediaId: mediaId
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
  }, {
    key: "updateMediaViews",
    value: function updateMediaViews(mediaId, viewerId) {
      return regeneratorRuntime.async(function updateMediaViews$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.findOrCreate({
                where: {
                  mediaId: mediaId,
                  userId: viewerId
                }
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
  }]);

  return Views;
}(Sequelize.Model);

Views.tablename = "VIEWS";
Views.modelFields = {
  mediaId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    primaryKey: true,
    references: {
      model: "MEDIAS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  userId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    primaryKey: true,
    references: {
      model: "USERS",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }
};
exports["default"] = Views;