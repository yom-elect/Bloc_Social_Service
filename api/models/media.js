/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class Media extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        });
        this.belongsTo(models.Blocs, {
            as: "bloc",
            foreignKey: "blocId",
        });
        this.hasMany(models.Comments, {
            as: "mediaComments",
            foreignKey: "mediaId",
        });
        this.hasMany(models.Views, {
            as: "mediaViews",
            foreignKey: "mediaId",
        });
        this.hasOne(models.MediaTypes, {
            foreignKey: "mediaTypeId",
            as: "mediaType",
        });
        this.hasOne(models.UserProfile, {
            foreignKey: "userId",
            as: "userProfile",
            targetKey: "userId"
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

    static async findMediaById(mediaId) {
        const singleMedia = await this.findOne({
            where: { id: mediaId },
            // include: [
            //   {
            //     model: this.Comment,
            //     where: {},
            //   },
            //   {
            //     model: this.Views,
            //   },
            // ],
        });
        return singleMedia && singleMedia.toJSON();
    };

    static async findByBlocId(blocId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        return await this.findAll({
            limit,
            offset,
            where: { blocId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                    model: this.sequelize.models.UserProfile,
                    as: "userProfile",
                    attributes: {
                        exclude: ["firstName", "lastName", "countryCode", "phoneNumber", "starRating", "userLocation", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: this.sequelize.models.Blocs,
                    as: "bloc",
                    attributes: {
                        exclude: ["blocImage", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: this.sequelize.models.Views,
                    as: "mediaViews",
                }
            ]
        });
    }

    static async findByHeadline(headline) {
        return await this.findAll({
            where: {
                headline: {
                    [Sequelize.Op.iRegexp]: `^${headline}`
                }
            },
        });
    }

    static async findAllMediaApprovalRequests(userId) {
        const mediaApproval = await this.findAll({
            where: { userId, blocId: null, mediaTypeId: null },
        });
        return mediaApproval
    }

    static async createMedia({
        blocId,
        caption,
        headline,
        mediaTypeId,
        source,
        userId,
        senderId
    }) {
        let createdMedia;

        try {
            createdMedia = await this.create({
                blocId,
                caption,
                headline,
                mediaTypeId,
                source,
                userId,
                senderId
            });
        } catch (e) {
            console.log(e);
            createdMedia = null;
            throw Error(e);
        }

        return createdMedia;
    }

    static async deleteMedia(mediaId) {
        const response = await this.destroy({
            where: {
                id: mediaId,
            },
        });
        return response;
    }

    static async updateMedia(mediaId, mediaInfo) {
        const media = await this.update(mediaInfo, {
            where: {
                id: mediaId,
            },
        });
        return media;
    }
}

Media.tablename = "MEDIAS";
Media.modelFields = {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    source: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
    },
    headline: {
        type: Sequelize.DataTypes.STRING(250),
    },
    caption: {
        type: Sequelize.DataTypes.STRING(250),
    },
    createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    blocId: {
        type: Sequelize.DataTypes.INTEGER,
        foreignKey: true,
        references: { model: "BLOCS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    senderId: {
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    mediaTypeId: {
        type: Sequelize.DataTypes.INTEGER,
        foreignKey: true,
        references: { model: "MEDIA_TYPES", key: "id" },
        onUpdate: "CASCADE",
    },
};

exports.default = Media;