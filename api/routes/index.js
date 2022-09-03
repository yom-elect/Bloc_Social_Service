/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const app = express();


const auth = require("./auth");
const bloc = require('./bloc');
const media = require("./media");
const userAccount = require("./userAccount");
const userProfile = require('./userProfile')
const push = require("./push");


app.use("/auth", auth);
app.use("/blocs", bloc);
app.use("/media", media);
app.use("/users", userAccount);
app.use("/profile", userProfile);
app.use("/nofication", push);


module.exports = app;
