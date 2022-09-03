/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class Views extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            as: "userView",
            foreignKey: "userId",
        });

        this.belongsTo(models.Media, {
            as: "mediaView",
            foreignKey: "mediaId",
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

    static async getMediaViewsCount(mediaId) {
        return await this.count({ where: { mediaId } });
    }

    static async updateMediaViews(mediaId, viewerId) {
        return await this.findOrCreate({
            where: {
                mediaId,
                userId: viewerId
            }
        })
    }

}


Views.tablename = "VIEWS";
Views.modelFields = {
    mediaId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        primaryKey: true,
        references: { model: "MEDIAS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        primaryKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};

exports.default = Views;