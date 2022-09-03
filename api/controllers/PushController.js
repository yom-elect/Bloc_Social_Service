/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */

const PushRepo = require("../repositories/PushRepo");
const asyncWrapper = require("../helpers/asyncWrapper");


class PushController {
    static async registerPushNotification(request, response) {
        return asyncWrapper(async (req, res) => {
            const { pushToken } = req.body;

            const createdPushToken = await new PushRepo().registerPushToken(pushToken);

            if (!createdPushToken[1]) {
                return res.status(400).json({
                    success: false,
                    message: `There already exist this token for device`,
                });
            }

            const { id: pushTokenId } = createdBloc[0];

            res.status(201).json({
                success: true,
                message: `token registered Succesfully`,
                data: { pushTokenId },
            });
        })(request, response);
    }

    static async updatePushNotification(request, response) {
        return asyncWrapper(async (req, res) => {
            const { newPushToken } = req.body;
            const { pushTokenId } = req.params;
            const { id: userId } = req.user;

            let updatedPushNotification = null;

            if (!userId && newPushToken) {
                updatedPushNotification = await new PushRepo().findByIdAndUpdate(pushTokenId, {
                    token: newPushToken,
                });
            } else if (!newPushToken && !userId) {
                updatedPushNotification = await new PushRepo().findByIdAndUpdate(pushTokenId, {
                    userId: null,
                });
            } else {
                updatedPushNotification = await new PushRepo().findByIdAndUpdate(pushTokenId, {
                    userId,
                });
            }


            if (updatedPushNotification[0] === 0) {
                return res.status(400).json({
                    success: false,
                    message: `${pushTokenId} does not exist`,
                });
            }

            res.status(200).json({
                success: true,
                message: `Updated PushNotification for ${pushTokenId}`,
                data: updatedPushNotification[1][0],
            });
        })(request, response);
    }

    static async deletePushNotification(request, response) {
        return asyncWrapper(async (req, res) => {
            const { pushTokenId } = req.params;

            const deletedPushNotification = await new PushRepo().findByIdAndDelete(pushTokenId);

            if (deletedPushNotification === 0) {
                return res.status(404).json({
                    success: false,
                    message: `There is no Notification with the id ${pushTokenId}`,
                });
            }

            res.status(204).send();
        })(request, response);
    }
}

module.exports = PushController;
