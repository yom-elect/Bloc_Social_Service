const Models = require("../models");
const { UsersBlocs } = Models;


class UsersBlocsRepo {
  async followBloc(userBlocList) {
    return await UsersBlocs.followBloc(userBlocList);
  }

  async unfollowBloc(userId, blocId) {
    return await UsersBlocs.unfollowBloc(userId, blocId);
  }
}

module.exports = UsersBlocsRepo;
