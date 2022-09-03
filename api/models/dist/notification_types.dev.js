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

var NotificationsTypes =
/*#__PURE__*/
function (_Sequelize$Model) {
  _inherits(NotificationsTypes, _Sequelize$Model);

  function NotificationsTypes() {
    _classCallCheck(this, NotificationsTypes);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotificationsTypes).apply(this, arguments));
  }

  _createClass(NotificationsTypes, null, [{
    key: "associate",
    value: function associate(models) {
      // define association here
      this.belongsTo(models.Notifications, {
        as: "notificationType",
        foreignKey: "notificationTypeId"
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
  }]);

  return NotificationsTypes;
}(Sequelize.Model);

NotificationsTypes.tablename = "NOTIFICATION_TYPES";
NotificationsTypes.modelFields = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: Sequelize.DataTypes.INTEGER
  },
  type: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING
  }
};
exports["default"] = NotificationsTypes;