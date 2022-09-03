/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class PushNotifications extends Sequelize.Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  }

  static modelInit(sequelize) {
    const model = this.init(this.modelFields, {
      tableName: this.tablename,
      sequelize,
      timestamps: false,
    });
    return model;
  }

  static async findByIdAndUpdate(id, newValues) {
    return  await this.update(newValues, {
      where: { id },
      returning: [ 'id', "userId"],
    });
  }

  static async findByIdAndDelete(id) {
    return await this.destroy({where: { id }});
  }

  static async registerPush(token) {
    return await this.findOrCreate({
      where: { token },
      defaults: { token },
    });
  }

}

PushNotifications.tablename = "PUSH_NOTIFICATIONS";
PushNotifications.modelFields = {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  userId: {
    allowNull: true,
    type: Sequelize.DataTypes.UUID,
    foreignKey: true,
    references: { model: "USERS", key: "id" },
  },
  token: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  }
};

exports.default = PushNotifications;
