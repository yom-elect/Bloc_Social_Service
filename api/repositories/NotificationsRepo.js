const Models = require("../models");
const { Notifications }  = Models;


class NotificationsRepo {
    async findAllUnreadNotifications(recipientId) {
        return await Notifications.findAllUnreadNotifications(recipientId);
    }

    async createNotification(notificationType, initiatorId, recipientId) {
        return await Notifications.createNotification(notificationType, initiatorId, recipientId);
    }

    async markNotificationAsRead(notificationId) {
        return await Notifications.markNotificationAsRead(notificationId);
    }
}

module.exports = NotificationsRepo;

