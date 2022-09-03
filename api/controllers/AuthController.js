/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const UserRepo = require("../repositories/UserRepo");
const PushRepo = require("../repositories/PushRepo");
const { UserExists } = require("../helpers/errors");
const BcryptService = require("../services/bcrypt.service");
const AuthService = require("../services/auth.service");
const EmailService = require("../services/mail");
const asyncWrapper = require("../helpers/asyncWrapper");

const { generatePassword } = BcryptService();
class AuthController {
    static async socialLogin(req, res) {
        return asyncWrapper(async() => {
            const { email, socialToken } = req.body;
            const pushTokenId = req.header("PushTokenId");
            let updatedPushNotification = null;

            if (!email || !socialToken) {
                return res.status(400).json({
                    success: false,
                    errors: [{
                        parameter: "email",
                        message: "No email or token Provided",
                    }, ],
                });
            }
            const user = await new UserRepo().loginSocialUser(email, socialToken);
            user.token = AuthService().issue(user);
            user.refreshToken = AuthService().issueRefresh(user);
            if (user) {
                const blocs = await new UserRepo().getUserBlocs(user);

                if (pushTokenId){
                 updatedPushNotification = await new PushRepo().findByIdAndUpdate(pushTokenId,{
                    userId: user.id
                }); 
                }
               
                EmailService(user.email, "", null, "welcome");
                return res.status(201).json({
                    success: true,
                    message: "User created successfully",
                    data: {
                        userId: user.id,
                        email: user.email,
                        accountType: user.accountType,
                        token: user.token,
                        refreshToken: user.refreshToken,
                        userProfile: user.profile,
                        hasBlocs: blocs.length > 0,
                        pushNotification: updatedPushNotification
                    },
                });
            }
        })(req, res);
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const pushTokenId = req.header("PushTokenId");
            let updatedPushNotification = null;

            if (!email || !password) {
                return res.status(200).json({
                    success: false,
                    errors: [{
                        parameter: "email",
                        message: "No email or password Provided",
                    }, ],
                });
            }
            const user = await new UserRepo().loginUser(email, password);
            user.token = AuthService().issue(user);
            user.refreshToken = AuthService().issueRefresh(user);
            if (user) {
                const blocs = await new UserRepo().getUserBlocs(user);

                if (pushTokenId){
                    updatedPushNotification = await new PushRepo().findByIdAndUpdate(pushTokenId,{
                       userId: user.id
                   }); 
                }

                return res.status(200).json({
                    success: true,
                    message: "User data",
                    data: {
                        userId: user.id,
                        email: user.email,
                        accountType: user.accountType,
                        token: user.token,
                        refreshToken: user.refreshToken,
                        userProfile: user.profile,
                        hasBlocs: blocs.length > 0 ? true : false,
                        pushNotification: updatedPushNotification
                    },
                });
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
    static async register(req, res) {
        try {
            const { email, password, type } = req.body;
            // const user = await new UserRepo().removeUser(email);
            // return;
            const emailUser = await new UserRepo().getByEmail(email);
            if (emailUser) {
                return res.json({
                    success: false,
                    errors: [{
                        parameter: "email",
                        message: new UserExists(
                            `Account with email ${email} already exist on BlocApp`
                        ).error,
                    }, ],
                });
            }
            const hashedPassword = await generatePassword(password);
            const user = await new UserRepo().createUser(email, hashedPassword, type);
            if (user) {
                await EmailService(user.email, "", null, "welcome");
                return res.status(201).json({
                    success: true,
                    message: "User created successfully",
                    data: null,
                });
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                error: err.message,
            });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { userId } = req.body;
            const user = await new UserRepo().getById(userId);
            if (user) {
                const response = await new UserRepo().adminDeleteUser(userId);
                return res.status(203).json({
                    success: true,
                    message: "User deleted successfully",
                    data: null,
                });
            }

        } catch (err) {
            return res.status(400).json({
                success: false,
                error: err.message,
            });
        }

    }
    static async generateAccessToken(req, res) {
        return asyncWrapper(async() => {
            const { refreshToken } = req.body;
            const user = AuthService().verifyRefresh(refreshToken);
            if (user) {
                const accessToken = AuthService().issue(user);
                return res.status(201).json({
                    success: true,
                    message: "Token created successfully",
                    data: {
                        token: accessToken,
                    },
                });
            }
        })(req, res);
    }
}

module.exports = AuthController;