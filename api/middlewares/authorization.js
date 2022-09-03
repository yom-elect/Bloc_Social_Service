/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const authService = require("../services/auth.service");

class Authorization {
    static async authenticate(req, res, next) {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "Authentication token is required",
                data: null,
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const user = authService().verify(token);
            req.user = user;
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                message: "Authentication token invalid/expired",
                data: null,
            });
        }
    }

    static async authorizeDevAdmin(req, res, next) {
        const userStatus = req.user.accountType;
        if (userStatus !== "admin" || userStatus !== "developer") {
            res.status(401).json({
                success: false,
                message: "UnAuthorized request made",
                data: null,
            });
            return;
        }
        next();
    }

    static async authorizeAdmin(req, res, next) {
        const userStatus = req.user.accountType;
        if (userStatus !== "admin") {
            res.status(401).json({
                success: false,
                message: "UnAuthorized request made",
                data: null,
            });
            return;
        }
        next();
    }
}

module.exports = Authorization;