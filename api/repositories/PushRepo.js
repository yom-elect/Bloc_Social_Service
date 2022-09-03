/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const Models = require("../models");
const { PushNotifications } = Models;


class PushRepo {
  async findByIdAndUpdate(pushTokenId, newValues) {
    return await PushNotifications.findByIdAndUpdate(pushTokenId, newValues);
  }

  async findByIdAndDelete(pushTokenId) {
    return await PushNotifications.findByIdAndDelete(pushTokenId);
  }

  async registerPushToken(pushToken) {
    return await PushNotifications.registerPush(pushToken);
  }
}

module.exports = PushRepo;
