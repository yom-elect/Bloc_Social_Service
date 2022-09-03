"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable linebreak-style */

/* eslint-disable import/newline-after-import */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */
var cloudinary = require("../services/media/cloudinary");

var MediaRepo = require("../repositories/MediaRepo");

var CommentRepo = require("../repositories/CommentRepo");

var NotificationsController = require("./NotificationsController");

var asyncWrapper = require("../helpers/asyncWrapper");

var MediaController =
/*#__PURE__*/
function () {
  function MediaController() {
    _classCallCheck(this, MediaController);
  }

  _createClass(MediaController, null, [{
    key: "sourceUpload",
    value: function sourceUpload(req, res) {
      var mediaType, uploader, urls, files, sourceInfo;
      return regeneratorRuntime.async(function sourceUpload$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Media Types  = ["Media","Blocs","Profile"]
              mediaType = req.query.mediatype;

              uploader = function uploader(path) {
                return regeneratorRuntime.async(function uploader$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap(cloudinary.uploads(path, mediaType.toString()));

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              };

              _context2.prev = 2;
              urls = [];
              files = req.files;
              _context2.next = 7;
              return regeneratorRuntime.awrap(cloudinary.sourceInfo(files, urls, uploader));

            case 7:
              sourceInfo = _context2.sent;

              if (!(sourceInfo.length === 0 || !sourceInfo[0])) {
                _context2.next = 10;
                break;
              }

              throw new Error("could not Reach cloud storage");

            case 10:
              res.status(200).json({
                message: "Media uploaded Successfully",
                data: sourceInfo
              });
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](2);
              res.status(400).json({
                message: "Media not uploaded",
                err: _context2.t0.message
              });

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 13]]);
    }
  }, {
    key: "getMediaById",
    value: function getMediaById(req, res) {
      var mediaId, media;
      return regeneratorRuntime.async(function getMediaById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              mediaId = req.params.mediaId;
              _context3.next = 4;
              return regeneratorRuntime.awrap(new MediaRepo().getMediaById(mediaId));

            case 4:
              media = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                success: true,
                message: "Get media success",
                data: media
              }));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).json({
                success: false,
                message: _context3.t0.message
              }));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getAllUserMediaByMediaType",
    value: function getAllUserMediaByMediaType(req, res) {
      return regeneratorRuntime.async(function getAllUserMediaByMediaType$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", asyncWrapper(function _callee(req, res) {
                var mediaTypeId, id, allUserMedia;
                return regeneratorRuntime.async(function _callee$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        mediaTypeId = req.query.mediaTypeId;
                        id = req.user.id;
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(new MediaRepo().getAllUserMediaByMediaType(id, mediaTypeId));

                      case 4:
                        allUserMedia = _context4.sent;
                        return _context4.abrupt("return", res.status(200).json({
                          success: true,
                          message: "Get media success",
                          data: allUserMedia
                        }));

                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              })(req, res));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "createMedia",
    value: function createMedia(req, res) {
      var userId, mediaInfo, media;
      return regeneratorRuntime.async(function createMedia$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              userId = req.user.id;
              mediaInfo = req.body;
              mediaInfo.userId = userId;
              mediaInfo.source = JSON.stringify(mediaInfo.source);
              _context6.next = 7;
              return regeneratorRuntime.awrap(new MediaRepo().createMedia(mediaInfo));

            case 7:
              media = _context6.sent;
              return _context6.abrupt("return", res.status(201).json({
                success: true,
                message: "Successfully Created Media",
                data: media
              }));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                success: false,
                message: _context6.t0.message
              }));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "updateMedia",
    value: function updateMedia(req, res) {
      var mediaId, userId, mediaInfo, media;
      return regeneratorRuntime.async(function updateMedia$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              mediaId = req.params.mediaId;
              userId = req.user.id;
              mediaInfo = req.body;
              mediaInfo.userId = userId;
              _context7.next = 7;
              return regeneratorRuntime.awrap(new MediaRepo().updateMedia(mediaId, mediaInfo));

            case 7:
              media = _context7.sent;
              return _context7.abrupt("return", res.status(201).json({
                success: true,
                message: "Successfully Updated Media",
                data: media
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(400).json({
                success: false,
                message: _context7.t0.message
              }));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "getMediaByHeadline",
    value: function getMediaByHeadline(request, response) {
      return regeneratorRuntime.async(function getMediaByHeadline$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", asyncWrapper(function _callee2(req, res) {
                var headline, media;
                return regeneratorRuntime.async(function _callee2$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        headline = req.query.headline;
                        _context8.next = 3;
                        return regeneratorRuntime.awrap(new MediaRepo().findByHeadline(headline));

                      case 3:
                        media = _context8.sent;

                        if (!(media.length === 0)) {
                          _context8.next = 6;
                          break;
                        }

                        return _context8.abrupt("return", res.status(404).json({
                          success: false,
                          message: "There is no media with headline starting with ".concat(headline)
                        }));

                      case 6:
                        res.status(200).json({
                          success: true,
                          message: "All media with headline starting with ".concat(headline),
                          data: media
                        });

                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "deleteMedia",
    value: function deleteMedia(req, res) {
      var mediaId, response;
      return regeneratorRuntime.async(function deleteMedia$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              mediaId = req.body.mediaId;
              _context10.next = 4;
              return regeneratorRuntime.awrap(new MediaRepo().deleteMedia(mediaId));

            case 4:
              response = _context10.sent;
              return _context10.abrupt("return", res.status(201).json({
                success: true,
                message: "Successfully Deleted Media",
                data: response
              }));

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", res.status(400).json({
                success: false,
                message: _context10.t0.message
              }));

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "shareMedia",
    value: function shareMedia(request, response) {
      return regeneratorRuntime.async(function shareMedia$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", asyncWrapper(function _callee3(req, res) {
                var _req$body, friendId, source, userId, media, notificationType, initiatorId, recipientId, notificationData;

                return regeneratorRuntime.async(function _callee3$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _req$body = req.body, friendId = _req$body.friendId, source = _req$body.source;
                        userId = req.user.id;

                        if (!(userId === friendId)) {
                          _context11.next = 4;
                          break;
                        }

                        return _context11.abrupt("return", res.status(400).json({
                          success: false,
                          message: "User cannot share media with itself."
                        }));

                      case 4:
                        _context11.next = 6;
                        return regeneratorRuntime.awrap(new MediaRepo().createMedia({
                          source: source,
                          userId: friendId
                        }));

                      case 6:
                        media = _context11.sent;

                        if (media) {
                          _context11.next = 9;
                          break;
                        }

                        return _context11.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Media cannot be shared."
                        }));

                      case 9:
                        notificationType = 2;
                        initiatorId = userId;
                        recipientId = friendId;
                        notificationData = media;
                        _context11.next = 15;
                        return regeneratorRuntime.awrap(NotificationsController.createNotification({
                          notificationType: notificationType,
                          initiatorId: initiatorId,
                          recipientId: recipientId,
                          notificationData: notificationData
                        }));

                      case 15:
                        return _context11.abrupt("return", res.status(201).json({
                          success: true,
                          message: "Successfully Shared Media",
                          data: media
                        }));

                      case 16:
                      case "end":
                        return _context11.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "getMediaApprovalRequests",
    value: function getMediaApprovalRequests(request, response) {
      return regeneratorRuntime.async(function getMediaApprovalRequests$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", asyncWrapper(function _callee4(req, res) {
                var userId, mediaApprovalRequests;
                return regeneratorRuntime.async(function _callee4$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        userId = req.user.id;
                        _context13.next = 3;
                        return regeneratorRuntime.awrap(new MediaRepo().findAllMediaApprovalRequests(userId));

                      case 3:
                        mediaApprovalRequests = _context13.sent;
                        res.status(200).json({
                          success: true,
                          message: "Media Approval requests",
                          data: mediaApprovalRequests
                        });

                      case 5:
                      case "end":
                        return _context13.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      });
    }
  }, {
    key: "createComment",
    value: function createComment(request, response) {
      return regeneratorRuntime.async(function createComment$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", asyncWrapper(function _callee5(req, res) {
                var mediaId, textContent, userId, createdComment, notificationType, initiatorId, recipientId, _createdComment$media, id, blocId, source, notificationData;

                return regeneratorRuntime.async(function _callee5$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        mediaId = req.params.mediaId;
                        textContent = req.body.textContent;
                        userId = req.user.id;
                        _context15.next = 5;
                        return regeneratorRuntime.awrap(new CommentRepo().createComment({
                          mediaId: mediaId,
                          userId: userId,
                          textContent: textContent
                        }));

                      case 5:
                        createdComment = _context15.sent;

                        if (createdComment.comment) {
                          _context15.next = 8;
                          break;
                        }

                        return _context15.abrupt("return", res.status(400).json({
                          success: false,
                          message: "Comment cannot be created."
                        }));

                      case 8:
                        notificationType = 3;
                        initiatorId = userId;
                        recipientId = createdComment.media.userId;
                        _createdComment$media = createdComment.media, id = _createdComment$media.id, blocId = _createdComment$media.blocId, source = _createdComment$media.source;
                        notificationData = {
                          blocId: blocId,
                          mediaId: id,
                          source: source
                        };

                        if (!(recipientId !== initiatorId)) {
                          _context15.next = 16;
                          break;
                        }

                        _context15.next = 16;
                        return regeneratorRuntime.awrap(NotificationsController.createNotification({
                          notificationType: notificationType,
                          initiatorId: initiatorId,
                          recipientId: recipientId,
                          notificationData: notificationData
                        }));

                      case 16:
                        res.status(201).json({
                          success: true,
                          message: "Comment successfully created",
                          data: createdComment.comment
                        });

                      case 17:
                      case "end":
                        return _context15.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  }, {
    key: "getComments",
    value: function getComments(request, response) {
      return regeneratorRuntime.async(function getComments$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", asyncWrapper(function _callee6(req, res) {
                var mediaId, mediaComments;
                return regeneratorRuntime.async(function _callee6$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        mediaId = req.params.mediaId;
                        _context17.next = 3;
                        return regeneratorRuntime.awrap(new CommentRepo().getComments(mediaId));

                      case 3:
                        mediaComments = _context17.sent;
                        res.status(200).json({
                          success: true,
                          message: "Comments for media with id ".concat(mediaId),
                          data: mediaComments
                        });

                      case 5:
                      case "end":
                        return _context17.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      });
    }
  }, {
    key: "getCommentsCount",
    value: function getCommentsCount(request, response) {
      return regeneratorRuntime.async(function getCommentsCount$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", asyncWrapper(function _callee7(req, res) {
                var mediaId, mediaCommentsCount;
                return regeneratorRuntime.async(function _callee7$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        mediaId = req.params.mediaId;
                        _context19.next = 3;
                        return regeneratorRuntime.awrap(new CommentRepo().getCommentsCount(mediaId));

                      case 3:
                        mediaCommentsCount = _context19.sent;
                        res.status(200).json({
                          success: true,
                          message: "Number of comments for media with id ".concat(mediaId),
                          data: mediaCommentsCount
                        });

                      case 5:
                      case "end":
                        return _context19.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context20.stop();
          }
        }
      });
    }
  }, {
    key: "getMediaViewsCount",
    value: function getMediaViewsCount(request, response) {
      return regeneratorRuntime.async(function getMediaViewsCount$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", asyncWrapper(function _callee8(req, res) {
                var mediaId, mediaViewsCount;
                return regeneratorRuntime.async(function _callee8$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        mediaId = req.params.mediaId;
                        _context21.next = 3;
                        return regeneratorRuntime.awrap(new MediaRepo().getMediaViewsCount(mediaId));

                      case 3:
                        mediaViewsCount = _context21.sent;
                        res.status(200).json({
                          success: true,
                          message: "Number of views for media with id ".concat(mediaId),
                          data: mediaViewsCount
                        });

                      case 5:
                      case "end":
                        return _context21.stop();
                    }
                  }
                });
              })(request, response));

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      });
    }
  }]);

  return MediaController;
}();

module.exports = MediaController;