const io = require("../api")
const AuthService = require('./auth.service');
const NotificationsController = require('../controllers/NotificationsController');



io.on('connection', (socket) => {
    socket.on('join', (token) => {
        try {
            const user = AuthService().verify(token);

            if (!user.isActive) {
                socket.emit('inActiveUser', {
                    success: false,
                    message: "Activate account to continue",
                    data: null,
                });

                return;
            }
            socket.join(`${user.id}-notifications`);
        } catch (e) {
            socket.emit('connectionError', {
                success: false,
                message: "Authentication token invalid",
                data: null,
            })
        }
    });

    socket.on('markNotificationAsRead', async(notificationId) => {
        await NotificationsController.markNotificationAsRead(notificationId);
    });
});