/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class Blocs extends Sequelize.Model {
  static associate(models) {
    // define association here
    this.belongsToMany(models.User, {
      through: models.UsersBlocs,
      as: "user",
      foreignKey: "blocId",
      otherKey: "userId",
    });

    this.hasMany(models.Media, {
      as: "medias",
      foreignKey: "blocId",
    });
  }

  static modelInit(sequelize) {
    const model = this.init(this.modelFields, {
      tableName: this.tablename,
      sequelize,
    });
    return model;
  }

  static async findByName(blocName) {
    return await this.findAll({
      where: { blocName: { [Sequelize.Op.iRegexp]: `^${blocName}` } },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  }

  static async findAllBlocs() {
    return  await this.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } } );
  }

  static async findByIdAndUpdate(id, newValues) {
    return  await this.update(newValues, {
      where: { id },
      returning: [ 'id', 'blocName', 'blocImage'],
    });
  }

  static async findByIdAndDelete(id) {
    return await this.destroy({where: { id }});
  }

  static async createBloc(blocName, blocImage) {
    return await this.findOrCreate({
      where: { blocName },
      defaults: { blocName, blocImage },
    });
  }
}

Blocs.tablename = "BLOCS";
Blocs.modelFields = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true
  },
  blocName: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING(50),
  },
  blocImage: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING(255),
  }
};

exports.default = Blocs;
