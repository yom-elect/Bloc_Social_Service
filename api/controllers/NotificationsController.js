/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const { isUUID } = require('validator');
const NotificationsRepo = require("../repositories/NotificationsRepo");
const asyncWrapper = require("../helpers/asyncWrapper");
const io = require("../api");


class NotificationsController {
    static async getAllUnreadNotifications(request, response) {
        return asyncWrapper(async(req, res) => {
            const { id: recipientId } = req.user;

            const unreadNotifications = await new NotificationsRepo().findAllUnreadNotifications(recipientId);

            res.status(200).json({
                success: true,
                message: "All unread Notification",
                data: unreadNotifications[1],
            });
        })(request, response);
    }

    static async createNotification(newNotification) {
        const { notificationType, initiatorId, recipientId, notificationData } = newNotification;

        const createdNotification = await new NotificationsRepo().createNotification(notificationType, initiatorId, recipientId);

        if (!createdNotification) return;

        io.to(`${recipientId}-notifications`).emit('newNotification', {
            success: true,
            message: 'New notification',
            data: {
                id: createdNotification.id,
                initiatorId: createdNotification.initiatorId,
                notificationType: createdNotification.notificationType,
                notificationData
            }
        });
    }

    static async markNotificationAsRead(notificationId) {
        const UUIDVersion = "4";

        if (!isUUID(String(notificationId), UUIDVersion)) return;

        const readNotification = await new NotificationsRepo().markNotificationAsRead(notificationId);

        if ((readNotification[1]).length === 0) return;

        const recipientId = readNotification[1][0].recipientId;

        io.to(`${recipientId}-notifications`).emit('readNotification', {
            success: true,
            message: 'Read notification',
            data: {
                id: notificationId,
            }
        });
    }
}

module.exports = NotificationsController;