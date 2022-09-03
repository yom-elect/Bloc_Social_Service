/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "PUSH_NOTIFICATIONS",
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
          },
          userId: {
            allowNull: true,
            type: Sequelize.DataTypes.UUID,
            foreignKey: true,
            references: { model: "USERS", key: "id" },
          },
          token: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(2400)
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PUSH_NOTIFICATIONS");
  },
};
