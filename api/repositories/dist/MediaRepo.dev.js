"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var Models = require("../models");

var Media = Models.Media,
    User = Models.User,
    Views = Models.Views;

var MediaRepo =
/*#__PURE__*/
function () {
  function MediaRepo() {
    _classCallCheck(this, MediaRepo);
  }

  _createClass(MediaRepo, [{
    key: "getMediaById",
    value: function getMediaById(id) {
      return regeneratorRuntime.async(function getMediaById$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Media.findMediaById(id));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "updateMediaViews",
    value: function updateMediaViews(mediaId, viewerId) {
      return regeneratorRuntime.async(function updateMediaViews$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Views.updateMediaViews(mediaId, viewerId));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getMediaViewsCount",
    value: function getMediaViewsCount(mediaId) {
      return regeneratorRuntime.async(function getMediaViewsCount$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(Views.getMediaViewsCount(mediaId));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "findByBlocId",
    value: function findByBlocId(blocId) {
      return regeneratorRuntime.async(function findByBlocId$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(Media.findByBlocId(blocId));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "findByHeadline",
    value: function findByHeadline(headline) {
      return regeneratorRuntime.async(function findByHeadline$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(Media.findByHeadline(headline));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "findAllMediaApprovalRequests",
    value: function findAllMediaApprovalRequests(userId) {
      return regeneratorRuntime.async(function findAllMediaApprovalRequests$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(Media.findAllMediaApprovalRequests(userId));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "createMedia",
    value: function createMedia(mediaInfo) {
      return regeneratorRuntime.async(function createMedia$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(Media.createMedia(mediaInfo));

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "updateMedia",
    value: function updateMedia(mediaId, mediaInfo) {
      return regeneratorRuntime.async(function updateMedia$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(Media.updateMedia(mediaId, mediaInfo));

            case 2:
              return _context8.abrupt("return", _context8.sent);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }, {
    key: "deleteMedia",
    value: function deleteMedia(mediaId) {
      return regeneratorRuntime.async(function deleteMedia$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(Media.deleteMedia(mediaId));

            case 2:
              return _context9.abrupt("return", _context9.sent);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "getAllUserMediaByMediaType",
    value: function getAllUserMediaByMediaType(userId, mediaTypeId) {
      return regeneratorRuntime.async(function getAllUserMediaByMediaType$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(User.getAllUserMediaByMediaType(userId, mediaTypeId));

            case 2:
              return _context10.abrupt("return", _context10.sent);

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }]);

  return MediaRepo;
}();

module.exports = MediaRepo;