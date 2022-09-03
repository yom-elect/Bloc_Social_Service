"use strict";

var socketio = require('socket.io');

var AuthService = require('./auth.service');

var NotificationsController = require('../controllers/NotificationsController');

var server = require("../api");

var io = socketio(server);
module.exports = io;
io.on('connection', function (socket) {
  socket.on('join', function (token) {
    try {
      var user = AuthService().verify(token);

      if (!user.isActive) {
        socket.emit('inActiveUser', {
          success: false,
          message: "Activate account to continue",
          data: null
        });
        return;
      }

      socket.join("".concat(user.id, "-notifications"));
    } catch (e) {
      socket.emit('connectionError', {
        success: false,
        message: "Authentication token invalid",
        data: null
      });
    }
  });
  socket.on('markNotificationAsRead', function _callee(notificationId) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(NotificationsController.markNotificationAsRead(notificationId));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});