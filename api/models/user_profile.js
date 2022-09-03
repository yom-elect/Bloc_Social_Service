/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */

const Sequelize = require("sequelize");

class UserProfile extends Sequelize.Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
        this.hasMany(models.Comments, {
            as: "comments",
            foreignKey: "userId",
            onDelete: "CASCADE",
            sourceKey: "userId",
        });
        this.hasMany(models.Friends, {
            as: "friends",
            foreignKey: "userId",
            onDelete: "CASCADE",
            sourceKey: "userId",
        });
        this.hasOne(models.Media, {
            as: "medias",
            foreignKey: "senderId",
            onDelete: "CASCADE",
            sourceKey: "userId",
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
    static async findUserByPhoneNumber(phoneNumber, countryCode) {
        const user = await this.findOne({
            where: {
                phoneNumber,
                countryCode
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return user && user.toJSON();
    }

    static async findUserByUsername(username) {
        const limit = 100;
        const user = await this.findAll({
            limit,
            where: { username: { [Sequelize.Op.iRegexp]: `^${username}` } },
            attributes:{
                exclude: ["createdAt", "updatedAt","userLocation","phoneNumber","countryCode"]
            },
        });
        return user;
        }
        // Profile picture will be removed , testing purpose alone
    static async addUserProfile(username, userId) {
        const userProfile = await this.create({
            // profilePicture:
            //   "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/music_bvuykx.jpg",
            username,
            userId,
        });
        return userProfile && userProfile.toJSON();
    }

    static async updateUserProfilePicture(userId, profilePhoto) {
        const response = await this.update({
            profilePicture: profilePhoto,
        }, {
            where: {
                userId,
            },
        });
        return response;
    }

    static async updateUserProfileRating(userId, rating) {
        const response = await this.update({
            starRating: rating,
        }, {
            where: {
                userId,
            },
        });
        return response;
    }

    static async updateUserProfile(userProfileInfo, userId) {
        const response = await this.update({
            userProfileInfo,
        }, {
            where: {
                userId,
            },
        });
        return response;
    }
    static async getByUserId(id) {
        const userProfile = await this.findOne({
            where: {
                userId: id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return userProfile && userProfile.toJSON();
    }
    static async getByProfileId(id) {
        const userProfile = await this.findOne({
            where: {
                id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        return userProfile && userProfile.toJSON();
    }
}

UserProfile.tablename = "USER_PROFILE";
UserProfile.modelFields = {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    username: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(50),
        unique: true,
    },
    firstName: {
        type: Sequelize.DataTypes.STRING(50),
    },
    lastName: {
        type: Sequelize.DataTypes.STRING(50),
    },
    countryCode: {
        type: Sequelize.DataTypes.STRING(3),
    },
    phoneNumber: {
        type: Sequelize.DataTypes.STRING(10),
    },
    userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        foreignKey: true,
        references: {
            model: "USERS",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    profilePicture: {
        type: Sequelize.DataTypes.STRING,
    },
    starRating: {
        type: Sequelize.DataTypes.TINYINT,
    },
    userLocation: {
        type: Sequelize.DataTypes.STRING,
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

exports.default = UserProfile;