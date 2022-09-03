/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const Models = require("../models");
const { Blocs } = Models;


class BlocRepo {
  async findAllBlocs() {
    return await Blocs.findAllBlocs();
  }

  async findByIdAndUpdate(blocId, newValues) {
    return await Blocs.findByIdAndUpdate(blocId, newValues);
  }

  async findByIdAndDelete(blocId) {
    return await Blocs.findByIdAndDelete(blocId);
  }

  async findByName(blocName) {
    return await Blocs.findByName(blocName);
  }

  async createBloc(blocName, blocImage) {
    return await Blocs.createBloc(blocName, blocImage);
  }
}

module.exports = BlocRepo;
