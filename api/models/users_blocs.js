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

class UsersBlocs extends Sequelize.Model {
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
    }
    static modelInit(sequelize) {
        const model = this.init(this.modelFields, {
            tableName: this.tablename,
            sequelize,
        });
        return model;
    }

    static async getUserTimeline(userId) {
        return await this.findAll({
            where: { userId },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "userId"
                ],
            },
            include: [{
                model: this.sequelize.models.Blocs,
                as: "bloc",
                attributes: ['blocName'],
                include: [{
                    model: this.sequelize.models.Media,
                    as: "medias",
                    where: { mediaTypeId: 1 },
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
                                    "countryCode"
                                ],
                            },
                        }]
                    }]
                }]
            }]
        })
    }

    static async followBloc(userBlocList) {
        let createdUserBlocs;

        try {
            createdUserBlocs = await this.bulkCreate(userBlocList);
        } catch (e) {
            createdUserBlocs = null
        }

        return createdUserBlocs;
    }

    static async unfollowBloc(userId, blocId) {
        return await this.destroy({ where: { blocId, userId } });
    }
}

UsersBlocs.tablename = "USER_BLOC";
UsersBlocs.modelFields = {
    blocId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        references: { model: "BLOCS", key: "id" },
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
    }
};


exports.default = UsersBlocs;