/* eslint-disable quotes */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        try {
            await queryInterface.createTable("MEDIAS", {
                id: {
                    type: Sequelize.DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.DataTypes.UUIDV4,
                },
                source: {
                    allowNull: false,
                    type: Sequelize.DataTypes.TEXT,
                },
                headline: {
                    type: Sequelize.DataTypes.STRING(250),
                },
                caption: {
                    type: Sequelize.DataTypes.STRING(250),
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DataTypes.DATE,
                },
                blocId: {
                    type: Sequelize.DataTypes.INTEGER,
                    foreignKey: true,
                    references: { model: "BLOCS", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
                userId: {
                    allowNull: false,
                    type: Sequelize.DataTypes.UUID,
                    foreignKey: true,
                    references: { model: "USERS", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                senderId: {
                    type: Sequelize.DataTypes.UUID,
                    foreignKey: true,
                    references: { model: "USERS", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
                mediaTypeId: {
                    type: Sequelize.DataTypes.INTEGER,
                    foreignKey: true,
                    references: { model: "MEDIA_TYPES", key: "id" },
                    onUpdate: "CASCADE",
                },
                updatedAt: {
                    type: "TIMESTAMP",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
            });
        } catch (err) {
            throw new Error(err);
        }
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("MEDIAS");
    },
};