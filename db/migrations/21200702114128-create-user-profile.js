/* eslint-disable quotes */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("USER_PROFILE", {
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
          references: { model: "USERS", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        profilePicture: {
          type: Sequelize.DataTypes.STRING,
        },
        starRating: {
          type: Sequelize.DataTypes.INTEGER,
        },
        userLocation: {
          type: Sequelize.DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("USER_PROFILE");
  },
};
