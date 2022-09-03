"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable quotes */
var mailer = require("nodemailer");

var nodemailMailgun = require("nodemailer-mailgun-transport");

var _require = require("./generateEmailData"),
    getEmailData = _require.getEmailData; // const config = require("../../config");


require("dotenv").config();

var auth = {
  auth: {
    api_key: process.env.MAIL_GUN_API_KEY,
    domain: process.env.MAIL_GUN_DOMAIN
  }
};

var EmailService = function EmailService(to, name, token, type) {
  var actionData,
      transporter,
      mailInfo,
      info,
      _args = arguments;
  return regeneratorRuntime.async(function EmailService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          actionData = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
          _context.prev = 1;
          // Transport
          transporter = mailer.createTransport(nodemailMailgun(auth));
          mailInfo = getEmailData(to, name, token, type, actionData);
          _context.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail(mailInfo));

        case 6:
          info = _context.sent;
          return _context.abrupt("return", info);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          throw new Error("Something Went Wrong @Mail");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = EmailService;