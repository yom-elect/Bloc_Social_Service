"use strict";

/* eslint-disable quotes */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(queryInterface.createTable("NOTIFICATIONS", {
              id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                allowNull: false
              },
              recipientId: {
                allowNull: false,
                type: Sequelize.DataTypes.UUID,
                foreignKey: true,
                primaryKey: true,
                references: {
                  model: "USERS",
                  key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              notificationType: {
                type: Sequelize.DataTypes.INTEGER,
                foreignKey: true,
                references: {
                  model: "NOTIFICATION_TYPES",
                  key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              initiatorId: {
                allowNull: false,
                type: Sequelize.DataTypes.UUID,
                foreignKey: true,
                references: {
                  model: "USERS",
                  key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              read: {
                type: Sequelize.DataTypes.INTEGER,
                defaultValue: 0
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
              },
              updatedAt: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false
              }
            }));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable("NOTIFICATIONS"));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};