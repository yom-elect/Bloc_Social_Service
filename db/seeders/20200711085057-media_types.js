/* eslint-disable quotes */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "MEDIA_TYPES",
      [
        {
          id: 1,
          type: "created",
        },
        {
          id: 2,
          type: "saved",
        },
        {
          id: 3,
          type: "approved",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MEDIA_TYPES", null, {});
  },
};
