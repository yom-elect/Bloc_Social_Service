/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "FRIENDS",
        {
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
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            foreignKey: true,
            references: { model: "USERS", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          isPending: {
            allowNull: false,
            type: Sequelize.DataTypes.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FRIENDS");
  },
};
