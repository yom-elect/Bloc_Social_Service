/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/**
 * third party libraries
 */
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
module.exports = io;
require('./services/notification');
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const createError = require("http-errors");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes");
const rateLimit = require("express-rate-limit");
const documentation = require('./documentation');


/**
 * server configuration
 */
const config = require("./config");
// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */

const DB = require("./models");


// const whitelist = ["http://localhost:4001"];
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
app.use(cors());

// logging to file
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"), {
        flags: "a",
    }
);
app.use(
    logger("combined", {
        stream: accessLogStream,
    })
);
// secure express app
app.use(
    helmet({
        dnsPrefetchControl: false,
        frameguard: false,
        ieNoOpen: false,
        // eslint-disable-next-line comma-dangle
    })
);

// parsing the request bodys
app.use(
    express.json({
        limit: "50mb",
    })
);
app.use(
    express.urlencoded({
        extended: false,
        limit: "50mb",
    })
);

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  //  apply to all requests
  app.use(limiter);

//swagger documentation
documentation(app);

// fill routes for express application
app.use("/api/v1", routes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Sorry can't find the route you are trying to reach",
        data: null,
    });
    next();
})

server.listen(config.port, () => {
    if (
        environment !== "production" &&
        environment !== "development" &&
        environment !== "testing"
    ) {
        // eslint-disable-next-line no-console
        console.error(
            // eslint-disable-next-line comma-dangle
            `NODE_ENV is set to ${environment}, but only production and development are valid.`
        );
        process.exit(1);
    }
    return DB;
});

// io.on('connection', (socket) => {
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