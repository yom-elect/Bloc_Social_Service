/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");


class Comments extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            foreignKey: "userId",
            as: "commentAuthor",
        });
        this.belongsTo(models.UserProfile, {
            foreignKey: "userId",
            as: "userProfile",
            targetKey: "userId"
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

    static async getComments(mediaId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        return await this.findAll({
            limit,
            offset,
            where: { mediaId },
            include: [{
                model: this.sequelize.models.UserProfile,
                as: "userProfile",
                attributes: {
                    exclude: ["firstName", "lastName", "countryCode", "phoneNumber", "userId", "starRating", "userLocation", "createdAt", "updatedAt"],
                },
            }, ]
        });
    }

    static async getCommentsCount(mediaId) {
        return await this.count({ where: { mediaId } });
    }

    static async createComment(newComment) {
        let createdComment;
        let mediaCommentBelongsTo;

        try {
            createdComment = await this.create(newComment);

            mediaCommentBelongsTo = await createdComment.getMedia();
        } catch (e) {
            createdComment = null
            mediaCommentBelongsTo = null;
        }

        return {
            comment: createdComment,
            media: mediaCommentBelongsTo
        };
    }
}

Comments.tablename = "COMMENTS";
Comments.modelFields = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    mediaId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "MEDIAS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    textContent: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
    },
};

exports.default = Comments;