"use strict";

/* eslint-disable quotes */

/* eslint-disable indent */

/* eslint-disable linebreak-style */
var MediaRepo = require("../repositories/MediaRepo");

var updateMediaViewsTimeine = function updateMediaViewsTimeine(info, userId) {
  info.forEach(function _callee(element) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(new MediaRepo().updateMediaViews(element.id, userId));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0.message);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  });
};

module.exports = {
  updateMediaViewsTimeine: updateMediaViewsTimeine
};