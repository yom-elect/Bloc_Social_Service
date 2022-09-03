/* eslint-disable quotes */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        try {
            await queryInterface.createTable("USERS", {
                id: {
                    type: Sequelize.DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.DataTypes.UUIDV4
                },
                email: {
                    type: Sequelize.DataTypes.STRING(150),
                    unique: "unique_email",
                },
                password: {
                    type: Sequelize.DataTypes.STRING(255),
                },
                socialToken: {
                    type: Sequelize.DataTypes.STRING(1200),
                },
                accountType: {
                    type: Sequelize.DataTypes.ENUM("admin", "user", "developer"),
                },
                isActive: {
                    type: Sequelize.DataTypes.INTEGER,
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("USERS");
    },
};