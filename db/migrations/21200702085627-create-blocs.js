/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "BLOCS",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
          },
          blocName: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(50),
          },
          blocImage: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(255),
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
    await queryInterface.dropTable("BLOCS");
  },
};
