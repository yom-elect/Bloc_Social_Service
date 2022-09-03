/* eslint-disable quotes */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(
        "COMMENTS",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
          },
          mediaId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            foreignKey: true,
            references: { model: "MEDIAS", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          userId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            foreignKey: true,
            references: { model: "USERS", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          textContent: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable("COMMENTS");
  },
};
