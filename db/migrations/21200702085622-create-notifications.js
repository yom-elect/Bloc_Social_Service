/* eslint-disable quotes */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        try {
            await queryInterface.createTable(
                "NOTIFICATIONS", {
                    id: {
                        type: Sequelize.DataTypes.UUID,
                        primaryKey: true,
                        defaultValue: Sequelize.DataTypes.UUIDV4,
                        allowNull: false,
                    },
                    recipientId: {
                        allowNull: false,
                        type: Sequelize.DataTypes.UUID,
                        foreignKey: true,
                        primaryKey: true,
                        references: { model: "USERS", key: "id" },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    notificationType: {
                        type: Sequelize.DataTypes.INTEGER,
                        foreignKey: true,
                        references: { model: "NOTIFICATION_TYPES", key: "id" },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    initiatorId: {
                        allowNull: false,
                        type: Sequelize.DataTypes.UUID,
                        foreignKey: true,
                        references: { model: "USERS", key: "id" },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    read: {
                        type: Sequelize.DataTypes.INTEGER,
                        defaultValue: 0
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DataTypes.DATE,
                    },
                    updatedAt: {
                        type: "TIMESTAMP",
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                        allowNull: false,
                    }
                }
            );
        } catch (err) {
            throw new Error(err);
        }
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("NOTIFICATIONS");
    },
};