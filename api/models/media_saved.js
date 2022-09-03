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

const Sequelize = require("sequelize");

class MediaSaved extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        });
        this.belongsTo(models.Media, {
            as: "media",
            foreignKey: "mediaId",
        });
    }
    static modelInit(sequelize) {
        const model = this.init(this.modelFields, {
            tableName: this.tablename,
            sequelize,
        });
        return model;
    }

    static async getUserBookmarkedMedia(userId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        return await this.findAll({
            limit,
            offset,
            where: { userId },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "userId"
                ],
            },
            include: [{
                model: this.sequelize.models.Media,
                as: "media",
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "userId",
                        "mediaTypeId",
                        "blocId"
                    ],
                },
                include: [{
                    model: this.sequelize.models.User,
                    as: "user",
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "isActive",
                            "password",
                            "email",
                            "accountType",
                            "socialToken"
                        ],
                    },
                    include: [{
                        model: this.sequelize.models.UserProfile,
                        as: "profile",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "phoneNumber",
                                "countryCode",
                                "userLocation",
                                "starRating"
                            ],
                        },
                    }]
                }]
            }]
        })
    }

    static async bookmarkMedia(userId, mediaId) {
        return await this.create({ mediaId, userId });
    }

    static async unBookmarkMedia(userId, mediaId) {
        return await this.destroy({ where: { mediaId, userId } });
    }
}

MediaSaved.tablename = "MEDIA_SAVED";
MediaSaved.modelFields = {
    mediaId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        foreignKey: true,
        // references: { model: "MEDIAS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

};


exports.default = MediaSaved;