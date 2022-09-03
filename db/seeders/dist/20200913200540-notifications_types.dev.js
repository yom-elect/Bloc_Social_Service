'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert("NOTIFICATION_TYPES", [{
              id: 1,
              type: "FRIEND_REQUEST",
              "createdAt": "2020-02-11 03:39:31",
              "updatedAt": "2022-06-02 14:32:52"
            }, {
              id: 2,
              type: "MEDIA_APPROVAL",
              "createdAt": "2020-02-11 03:39:31",
              "updatedAt": "2022-06-02 14:32:52"
            }, {
              id: 3,
              type: "MEDIA_COMMENT",
              "createdAt": "2020-02-11 03:39:31",
              "updatedAt": "2022-06-02 14:32:52"
            }]));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkDelete("NOTIFICATIONS_TYPES", null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};