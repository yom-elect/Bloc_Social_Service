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
const bcryptService = require("../services/bcrypt.service");

class User extends Sequelize.Model {
    static associate(models) {
        this.hasOne(models.UserProfile, {
            foreignKey: "userId",
            as: "profile",
        });
        this.hasOne(models.PushNotifications, {
            foreignKey: "userId",
            as: "pushNotifications",
        });
        this.belongsToMany(models.Blocs, {
            as: "bloc",
            through: "UsersBlocs",
            foreignKey: "userId",
            otherKey: "blocId",
        });
        this.hasMany(models.Friends, {
            as: "friends",
            foreignKey: "userId",
        });
        this.hasMany(models.Notifications, {
            as: "notification",
            foreignKey: "recipientId",
        });
        this.hasMany(models.Comments, {
            as: "comments",
            foreignKey: "userId",
        });
        this.hasMany(models.Media, {
            as: "media",
            foreignKey: "userId",
        });
        this.hasMany(models.Views, {
            as: "views",
            foreignKey: "userId",
        });
    }

    static modelInit(sequelize) {
        const model = this.init(this.modelFields, {
            tableName: this.tablename,
            sequelize,
        });
        // this.beforeCreate(this.beforeCreateHook.bind(this));
        return model;
    }

    static async findUserByEmail(email) {
        const user = await this.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return user && user.toJSON();
    }

    static async findUserProfileByEmail(email) {
        const user = await this.findOne({
            where: { email },
            include: [{
                model: this.sequelize.models.UserProfile,
                as: "profile",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'userLocation'],
                },
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return user && user.toJSON();
    }

    static async findUserById(id) {
        const user = await this.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "isActive",
                    "password",
                    "socialToken"
                ],
            }
        });
        return user && user.toJSON();
    }

    static async newUser(email, password, accountType = "user") {
        const user = await this.create({
            email,
            password,
            accountType,
            isActive: 1,
        });
        return user;
    }

    static async newSocialUser(email, socialToken, accountType = "user") {
        const user = await this.create({
            email,
            accountType,
            socialToken,
            isActive: 1,
        });
        return user;
    }

    static async adminDeleteUser(userId) {
        const response = await this.destroy({
            where: {
                id: userId,
            },
        });
        return response;
    }

    static async removeUser(email) {
        const response = await this.destroy({
            where: {
                email,
            },
        });
        return response;
    }

    static async updateUserPassword(email, info) {
        const user = await this.update(info, {
            where: {
                email,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', "isActive",
                    "password",
                    "socialToken"
                ]
            }
        });
        return user;
    }

    static async findByCredentials(email, password) {
        const user = await this.findUserProfileByEmail(email);

        if (!user) return null;

        const isPasswordValid = await bcryptService().comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) return null;

        return user;
    }

    static async getAllUserMediaByMediaType(userId, mediaTypeId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;

        const allMedia = await this.findAll({
            limit,
            offset,
            where: {
                id: userId
            },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "isActive",
                    "password",
                    "email",
                    "accountType",
                ],
            },
            include: [{
                model: this.sequelize.models.Media,
                as: "media",
                where: {
                    mediaTypeId
                },
                attributes: {
                    exclude: ["blocId", "createdAt", "updatedAt"],
                },
                include: [{
                    model: this.sequelize.models.Blocs,
                    as: "bloc",
                    attributes: {
                        exclude: ["id", "blocImage"],
                    },
                }]
            }],
        });

        return allMedia;
    }

    static async allUserData(userId) {
        const userData = await this.findAll({
            where: {
                id: userId
            },
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
                include: [
                    [
                        Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM "FRIENDS" AS "Friends"
                    WHERE
                        "Friends"."userId" = "User"."id"
                        AND
                        "Friends"."isPending" = false
                )`), "friendsCount"
                    ],
                    [
                        Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM "VIEWS" AS "Views"
                    WHERE
                        "Views"."userId" = "User"."id"
                )`), "viewsCount"
                    ],
                    [
                        Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM "MEDIAS" AS "Media"
                    WHERE
                        "Media"."userId" = "User"."id"
                )`), "mediasCount"
                    ],
                    [
                        Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM "COMMENTS" AS "Comments"
                    WHERE
                        "Comments"."userId" = "User"."id"
                )`), "commentsCount"
                    ],
                    [
                        Sequelize.literal(`(
                     SELECT COUNT(*) FROM "USERS" AS "User" LEFT OUTER JOIN "MEDIAS" AS "media" ON "User"."id" = "media"."userId" 
                    JOIN "COMMENTS" AS "comments" ON "media"."id" = "comments"."mediaId" WHERE
                    '${userId}'   LIKE '%' || "media"."userId" || '%'
                )`), "commentsInteraction"
                    ],
                    [
                        Sequelize.literal(`(
                     SELECT COUNT(*) FROM "USERS" AS "User" LEFT OUTER JOIN "MEDIAS" AS "media" ON "User"."id" = "media"."userId" 
                    JOIN "VIEWS" AS "Views" ON "media"."id" = "Views"."mediaId" WHERE
                    '${userId}'   LIKE '%' || "media"."userId" || '%'
                )`), "viewsInteraction"
                    ],
                ]
            },
        });

        return userData;
    }

    static async getAllUserFriends(userId, sortParam, order, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        const friends = await this.findAll({
            limit,
            offset,
            where: {
                id: userId
            },
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
                model: this.sequelize.models.Friends,
                as: "friends",
                where: { 
                    [Sequelize.Op.or]: [
                        { friendId: userId },
                        { userId: userId }
                      ],
                    isPending: false
                 },
                order: [
                    [`${sortParam}`, `${order}`]
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
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
                }, ],
            }, ],
        });

        return friends;
    }

    static async findByIdAndUpdate(id, newValues) {
        return await this.update(newValues, {
            where: {
                id
            },
            returning: ['id', ...Object.keys(newValues)]
        });
    }

    static async getUserBlocTimeline(userId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        const userTimeline = await this.sequelize.query(`
                     SELECT "Blocs"."blocName","media".*,"UserProfile"."username","UserProfile"."profilePicture", COUNT("Views"."mediaId") AS "Views" FROM "USERS" AS "Users"  JOIN "USER_BLOC" AS "UserBloc" 
                    ON "Users"."id" = "UserBloc"."userId"
                    JOIN "BLOCS" As "Blocs"
                    ON "UserBloc"."blocId" = "Blocs"."id"
                    JOIN "MEDIAS" AS "media" ON "Blocs"."id" = "media"."blocId"
                    JOIN "USER_PROFILE" AS "UserProfile" ON "media"."userId" = "UserProfile"."userId"
                    JOIN "VIEWS" AS "Views" ON "media"."id" = "Views"."mediaId"
                    WHERE
                    "media"."mediaTypeId" = 1  AND
                    '${userId}'   LIKE '%' || "UserBloc"."userId" || '%'
                    GROUP BY ("media"."id", "Blocs"."blocName","UserProfile"."username","UserProfile"."profilePicture" )
                    ORDER BY  "Views" ASC
                    LIMIT ${limit} OFFSET ${offset}
                    `, {
            type: Sequelize.QueryTypes.SELECT
        });
        return userTimeline;
    }

    static async getUserFriendsFeeds(userId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;
        const userTimeline = await this.sequelize.query(`
                    SELECT "Blocs"."blocName","media".*,"UserProfile"."username","UserProfile"."profilePicture" FROM "USERS" AS "Users" 
                    JOIN "USER_BLOC" AS "UserBloc" ON "Users"."id" = "UserBloc"."userId"
                    JOIN "BLOCS" As "Blocs" ON "UserBloc"."blocId" = "Blocs"."id"
                    JOIN "FRIENDS" AS "friends" ON "Users"."id" = "friends"."userId"
                    JOIN "USER_PROFILE" AS "UserProfile" ON "friends"."friendId" = "UserProfile"."userId"
                    JOIN "MEDIAS" AS "media" ON "friends"."friendId" = "media"."userId" 
                    WHERE "media"."mediaTypeId" = 1  AND
                    '${userId}'   LIKE '%' || "friends"."userId" || '%'
                    LIMIT ${limit} OFFSET ${offset}
                    `, {
            type: Sequelize.QueryTypes.SELECT
        });
        return userTimeline;
    }

    static async getFriendsSuggestion(userId, page) {
        const limit = page ? 30 : 100;
        const offset = page ? (page - 1) * limit : 0;

        return await this.sequelize.query(`
                SELECT "username", "profilePicture","UserProfile"."userId" FROM "USER_PROFILE" AS "UserProfile" 
                 WHERE "UserProfile"."userId" IN
                    (
                        SELECT * FROM (
                                SELECT "userId" FROM "USER_BLOC" AS "UsersBlocs" WHERE "UsersBlocs"."blocId" IN (SELECT "blocId"
                                FROM "USER_BLOC" AS "UsersBlocs" WHERE "UsersBlocs"."userId" = '${userId}') AND "UsersBlocs"."userId" != '${userId}'
                                UNION
                                SELECT "userId" FROM "USER_PROFILE" AS "UserProfile" WHERE "UserProfile"."countryCode" = (SELECT
                                "countryCode" FROM "USER_PROFILE" AS "UserProfile" WHERE "UserProfile"."userId" = '${userId}')
                                AND "UserProfile"."userId" != '${userId}'
                            ) AS "FriendsSuggestionsUserIds"
                            WHERE "FriendsSuggestionsUserIds"."userId" NOT IN  
                            (
                                SELECT "userId"
                                FROM "FRIENDS" AS "friends" 
                                WHERE "friends"."userId" = '${userId}' OR "friends"."friendId" = '${userId}'
                                UNION
                                SELECT "friendId" 
                                FROM "FRIENDS" AS "friends" 
                                WHERE "friends"."userId" = '${userId}' OR "friends"."friendId" = '${userId}'
                            )
                    ) 
                    LIMIT ${limit} OFFSET ${offset}
                    `, {
            type: Sequelize.QueryTypes.SELECT
        });
    }

    async getUserBlocs() {
        return await this.getBloc({
            joinTableAttributes: [],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
        });
    }
}

User.tablename = "USERS";
User.modelFields = {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    email: {
        type: Sequelize.DataTypes.STRING(150),
        unique: true,
    },
    password: {
        type: Sequelize.DataTypes.STRING(255),
    },
    socialToken: {
        type: Sequelize.DataTypes.STRING(1200),
    },
    accountType: {
        type: Sequelize.DataTypes.ENUM("admin", "user", "developer"),
    },
    isActive: {
        type: Sequelize.DataTypes.TINYINT,
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
};

exports.default = User;