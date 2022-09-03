/* eslint-disable quotes */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        try {
            await queryInterface.createTable(
                "MEDIA_SAVED", {
                    mediaId: {
                        allowNull: false,
                        type: Sequelize.DataTypes.UUID,
                        primaryKey: true,
                        foreignKey: true,
                        // references: { model: "MEDIAS", key: "id" },
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("MEDIA_SAVED");
    },
};