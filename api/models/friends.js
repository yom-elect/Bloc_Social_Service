/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class Friends extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "friendId",
        });
        this.belongsTo(models.UserProfile, {
            foreignKey: "userId",
            as: "userProfile",
            targetKey: "userId"
        });
    }

    static modelInit(sequelize) {
        const model = this.init(this.modelFields, {
            tableName: this.tablename,
            sequelize,
        });
        return model;
    }

    static async followFriend(userId, friendId) {
        let createdFriendship;

        try {
            createdFriendship = await this.create({
                userId,
                friendId,
                isPending: true,
            });
        } catch (e) {
            createdFriendship = null;
        }

        return createdFriendship;
    }

    static async getAllUserFriends(userId, sortParam = "name", order = "ASC", page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        const friends = await this.findAll({
            limit,
            offset,
            where: { 
                [Sequelize.Op.or]: [
                    { friendId: userId },
                    { userId: userId }
                  ],
                  isPending: false
             },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [{
                model: this.sequelize.models.User,
                as: "user",
                order: [
                    [`${sortParam}`, `${order}`]
                ],
                attributes: {
                    exclude: [ "createdAt",
                    "updatedAt",
                    "isActive",
                    "password",
                    "email",
                    "accountType",
                    "socialToken"],
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
            } ],
        });
       

        return friends;
    }

    static async getUserFriendsByUsername(username,userId, sortParam = "name", order = "ASC") {
        const limit = 100;
        const friends = await this.findAll({
            limit,
            where: { 
                [Sequelize.Op.or]: [
                    { friendId: userId },
                    { userId: userId }
                  ],
                  isPending: false
             },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [{
                model: this.sequelize.models.User,
                as: "user",
                order: [
                    [`${sortParam}`, `${order}`]
                ],
                attributes: {
                    exclude: [ "createdAt",
                    "updatedAt",
                    "isActive",
                    "password",
                    "email",
                    "accountType",
                    "socialToken"],
                },
                include: [{
                    model: this.sequelize.models.UserProfile,
                    as: "profile",
                    where: { username: { [Sequelize.Op.iRegexp]: `^${username}` } },
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "phoneNumber",
                            "countryCode"
                        ],
                    },
                }]
            } ],
        });
    
        return friends;
    }

    static async checkFriendship(userId, friendId) {
        return await this.findOne({ where: { userId, friendId } });
    }

    static async findAllFriendRequests(userId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        return await this.findAll({
            limit,
            offset,
            where: { friendId: userId, isPending: true },
            include: [{
                model: this.sequelize.models.UserProfile,
                as: "userProfile",
                attributes: {
                    exclude: ["firstName", "lastName", "countryCode", "phoneNumber", "id", "starRating", "userLocation", "createdAt", "updatedAt"],
                },
            }, ]
        });
    }

    async unfollowFriend() {
        return await this.destroy();
    }

    async saveFriendship() {
        return await this.save();
    }
}

Friends.tablename = "FRIENDS";
Friends.modelFields = {
    friendId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: { model: "USERS", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    isPending: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
    },
};

exports.default = Friends;