/* eslint-disable quotes */
const jwt = require("jsonwebtoken");

const accessTokenSecret =
    process.env.NODE_ENV === "production" ? process.env.ACCESS_TOKEN_SECRET : "secret";

const refreshTokenSecret =
    process.env.NODE_ENV === "production" ? process.env.REFRESH_TOKEN_SECRET : "refreshtokensecret";

const authService = () => {
    const issue = (payload) =>
        jwt.sign(payload, accessTokenSecret); // { expiresIn: 10800 }

    const issueRefresh = (payload) =>
        jwt.sign(payload, refreshTokenSecret, {
            expiresIn: 600000 //1800000
        });

    const verify = (token, cb) => jwt.verify(token, accessTokenSecret, {}, cb);

    const verifyRefresh = (token, cb) => jwt.verify(token, refreshTokenSecret, {}, cb);

    return {
        issue,
        verify,
        issueRefresh,
        verifyRefresh,
    };
};

module.exports = authService;