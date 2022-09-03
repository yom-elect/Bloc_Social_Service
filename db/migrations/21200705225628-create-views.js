/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "VIEWS",
        {
          mediaId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            foreignKey: true,
            primaryKey: true,
            references: { model: "MEDIAS", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          userId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            foreignKey: true,
            primaryKey: true,
            references: { model: "USERS", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("VIEWS");
  },
};
