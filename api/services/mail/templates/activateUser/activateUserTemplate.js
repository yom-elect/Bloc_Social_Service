/* eslint-disable linebreak-style */
/* eslint-disable quotes */
require("dotenv").config();

const activateUser = (userData) => `
  <!DOCTYPE html>
    <html style="margin: 0; padding: 0;" lang="en">
    <head>
        <title>Account activated!</title>
    </head>
    <body style="margin: 0; padding: 0;">
        <img
                class="full-width"
                src="https://res.cloudinary.com/bloc/image/upload/v1594365862/bloc_me_logo-23_imnt4r.png"
                style="vertical-align: sub; width: 100%;"
                alt="Bloc App Logo"
        />
        <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
            <tr>
                <td style="background-color: #999592; margin: 0 auto;">
                    <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Bloc</h1></td>
            </tr>
            <tr>
                <td style="margin: 0 auto;padding: 15px 25px;box-sizing: border-box">
                    <p>Hi ${userData.username}</p>
                    <p>Your account has successfully been activated! We are glad to have you back on the BLOC.</p>
                    <p>Explore new blocs <a href="#" target="_blank">here</a>.</p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #999592; margin: 0 auto;">
                    <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                        If you didn't request for an account activation. Kindly click <a href="#" target="_blank">here</a>to undo this action.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

module.exports = activateUser;
