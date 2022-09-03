/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class Notifications extends Sequelize.Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.User, {
      as: "userNotification",
      foreignKey: "recipientId",
    });
  }
  static modelInit(sequelize) {
    const model = this.init(this.modelFields, {
      tableName: this.tablename,
      sequelize
    });
    return model;
  }

  static async createNotification(notificationType, initiatorId, recipientId) {
    let createdNotification;

    try {
      createdNotification = await this.create({notificationType, initiatorId, recipientId});
    }catch (e) {
      createdNotification = null
    }

    return createdNotification;
  }

  static async findAllUnreadNotifications(recipientId) {
    return await this.update({ read: 1 }, { where: { recipientId, read: 0 }, returning: [ 'id', 'initiatorId', 'notificationType' ] });
  }

  static async markNotificationAsRead(notificationId) {
    return await this.update({ read: 1 }, { where: { id: notificationId, read: 0 }, returning: [ 'recipientId' ] });
  }
}


Notifications.tablename = "NOTIFICATIONS";
Notifications.modelFields = {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    allowNull: false,
  },
  notificationType: {
    type: Sequelize.DataTypes.INTEGER,
    foreignKey: true,
    references: { model: "NOTIFICATIONS_TYPES", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  initiatorId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    references: { model: "USERS", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  recipientId: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    primaryKey: true,
    references: { model: "USERS", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  read: {
    type: Sequelize.DataTypes.TINYINT,
    defaultValue: 0
  },
};

exports.default = Notifications;
