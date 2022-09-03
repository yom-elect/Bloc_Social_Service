'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "NOTIFICATION_TYPES", [{
                    id: 1,
                    type: "FRIEND_REQUEST",
                    "createdAt": "2020-02-11 03:39:31",
                    "updatedAt": "2022-06-02 14:32:52",
                },
                {
                    id: 2,
                    type: "MEDIA_APPROVAL",
                    "createdAt": "2020-02-11 03:39:31",
                    "updatedAt": "2022-06-02 14:32:52",
                },
                {
                    id: 3,
                    type: "MEDIA_COMMENT",
                    "createdAt": "2020-02-11 03:39:31",
                    "updatedAt": "2022-06-02 14:32:52",
                }
            ]
        )
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("NOTIFICATIONS_TYPES", null, {});
    }
};