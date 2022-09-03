/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const mailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const { getEmailData } = require("./generateEmailData");
// const config = require("../../config");
require("dotenv").config();

const auth = {
    auth: {
        api_key: process.env.MAIL_GUN_API_KEY,
        domain: process.env.MAIL_GUN_DOMAIN,
    },
};

const EmailService = async (to, name, token, type, actionData = null) => {
    try {
        // Transport
        const transporter = mailer.createTransport(nodemailMailgun(auth));

        const mailInfo = getEmailData(to, name, token, type, actionData);

        const info = await transporter.sendMail(mailInfo);

        //   console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return info;
    } catch (err) {
        console.log(err);
        throw new Error("Something Went Wrong @Mail");
    }
};

module.exports = EmailService;
