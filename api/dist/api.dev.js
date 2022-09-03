"use strict";

/* eslint-disable import/newline-after-import */

/* eslint-disable linebreak-style */

/* eslint-disable function-paren-newline */

/* eslint-disable quotes */

/**
 * third party libraries
 */
// const bodyParser = require("body-parser");
var express = require("express"); // const socketio = require('socket.io');


var app = express();

var http = require("http");

var server = http.createServer(app);
module.exports = server; // const io = socketio(server);
// module.exports = io;

var fs = require("fs");

var path = require("path");

var helmet = require("helmet");

var createError = require("http-errors");

var cors = require("cors");

var logger = require("morgan");

var routes = require("./routes");

var documentation = require('./documentation');
/**
 * server configuration
 */


var config = require("./config"); // environment: development, staging, testing, production


var environment = process.env.NODE_ENV;
/**
 * express application
 */

var DB = require("./models"); // const whitelist = ["http://localhost:4001"];
// const corsOption = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// allow cross origin requests
// configure to only allow requests from certain origins


app.use(cors()); // logging to file

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});
app.use(logger("combined", {
  stream: accessLogStream
})); // secure express app

app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false // eslint-disable-next-line comma-dangle

})); // parsing the request bodys

app.use(express.json({
  limit: "50mb"
}));
app.use(express.urlencoded({
  extended: false,
  limit: "50mb"
})); //swagger documentation

documentation(app); // fill routes for express application

app.use(routes);
app.use(function (req, res, next) {
  next(createError(404));
});
server.listen(config.port, function () {
  if (environment !== "production" && environment !== "development" && environment !== "testing") {
    // eslint-disable-next-line no-console
    console.error( // eslint-disable-next-line comma-dangle
    "NODE_ENV is set to ".concat(environment, ", but only production and development are valid."));
    process.exit(1);
  }

  return DB;
}); // io.on('connection', (socket) => {
//     socket.on('join', (token) => {
//         try {
//             const user = AuthService().verify(token);
//             if (!user.isActive) {
//                 socket.emit('inActiveUser', {
//                     success: false,
//                     message: "Activate account to continue",
//                     data: null,
//                 });
//                 return;
//             }
//             socket.join(`${user.id}-notifications`);
//         } catch (e) {
//             socket.emit('connectionError', {
//                 success: false,
//                 message: "Authentication token invalid",
//                 data: null,
//             })
//         }
//     });
//     socket.on('markNotificationAsRead', async (notificationId) => {
//         await NotificationsController.markNotificationAsRead(notificationId);
//     });
// });