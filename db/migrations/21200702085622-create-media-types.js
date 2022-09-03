/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "MEDIA_TYPES",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
          },
          type: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MEDIA_TYPES");
  },
};
