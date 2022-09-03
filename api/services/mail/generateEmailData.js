/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const welcome = require("./templates/welcome/welcomeTemplate");
const resetPassword = require("./templates/resetPassword/resetPasswordTemplate");
const activateUser = require("./templates/activateUser/activateUserTemplate");
const deactivateUser = require('./templates/deactiveUser/deactivateUserTemplate');
const config = require("../../config");

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: config.email.defaultSender, // sender address
        to,
        subject: `Welcome to BLOC ✔`, // Subject line

        html: welcome(),
      };
      break;
    case "reset_password":
      data = {
        from: config.email.defaultSender, // sender address
        to,
        subject: `Hi ${name} , reset your password  ✔`, // Subject line

        html: resetPassword(actionData),
      };
      break;
    case "activate_user":
      data = {
        from: config.email.defaultSender, // sender address
        to,
        subject: `Hi ${name} , account activated successfully ✔`, // Subject line
        html: activateUser(actionData),
      };
      break;
    case "deactivate_user":
      data = {
        from: config.email.defaultSender, // sender address
        to,
        subject: `Hi ${name} , account deactivated successfully ✔`, // Subject line
        html: deactivateUser(actionData),
      };
      break;
    default:
      return data;
  }

  return data;
};

module.exports = { getEmailData };
