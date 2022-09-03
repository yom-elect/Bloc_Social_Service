"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
var _require = require('validator'),
    isUUID = _require.isUUID;

var NotificationsRepo = require("../repositories/NotificationsRepo");

var asyncWrapper = require("../helpers/asyncWrapper");

var io = require("../services/notification");

var NotificationsController =
/*#__PURE__*/
function () {
  function NotificationsController() {
    _classCallCheck(this, NotificationsController);
  }

  _createClass(NotificationsController, null, [{
    key: "getAllUnreadNotifications",
    value: function getAllUnreadNotifications(request, response) {
      return regeneratorRuntime.async(function getAllUnreadNotifications$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", asyncWrapper(function _callee(req, res) {
                var recipientId, unreadNotifications;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        recipientId = req.user.id;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(new NotificationsRepo().findAllUnreadNotifications(recipientId));

                      case 3:
                        unreadNotifications = _context.sent;
                        res.status(200).json({
                          success: true,
                          message: "All unread Notification",
                          data: unreadNotifications[1]
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "createNotification",
    value: function createNotification(newNotification) {
      var notificationType, initiatorId, recipientId, notificationData, createdNotification;
      return regeneratorRuntime.async(function createNotification$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              notificationType = newNotification.notificationType, initiatorId = newNotification.initiatorId, recipientId = newNotification.recipientId, notificationData = newNotification.notificationData;
              _context3.next = 3;
              return regeneratorRuntime.awrap(new NotificationsRepo().createNotification(notificationType, initiatorId, recipientId));

            case 3:
              createdNotification = _context3.sent;

              if (createdNotification) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return");

            case 6:
              io.to("".concat(recipientId, "-notifications")).emit('newNotification', {
                success: true,
                message: 'New notification',
                data: {
                  id: createdNotification.id,
                  initiatorId: createdNotification.initiatorId,
                  notificationType: createdNotification.notificationType,
                  notificationData: notificationData
                }
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "markNotificationAsRead",
    value: function markNotificationAsRead(notificationId) {
      var UUIDVersion, readNotification, recipientId;
      return regeneratorRuntime.async(function markNotificationAsRead$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              UUIDVersion = "4";

              if (isUUID(String(notificationId), UUIDVersion)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(new NotificationsRepo().markNotificationAsRead(notificationId));

            case 5:
              readNotification = _context4.sent;

              if (!(readNotification[1].length === 0)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return");

            case 8:
              recipientId = readNotification[1][0].recipientId;
              io.to("".concat(recipientId, "-notifications")).emit('readNotification', {
                success: true,
                message: 'Read notification',
                data: {
                  id: notificationId
                }
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return NotificationsController;
}();

module.exports = NotificationsController;