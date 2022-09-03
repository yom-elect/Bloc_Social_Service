/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */
const Sequelize = require("sequelize");

class MediaTypes extends Sequelize.Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.Media, {
      as: "mediaType",
      foreignKey: "mediaTypeId",
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
}


MediaTypes.tablename = "MEDIA_TYPES";
MediaTypes.modelFields = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: Sequelize.DataTypes.INTEGER,
  },
  type: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
};

exports.default = MediaTypes;
