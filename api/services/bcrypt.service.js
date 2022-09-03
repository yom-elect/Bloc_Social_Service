/* eslint-disable quotes */
const bcrypt = require("bcrypt-nodejs");

const bcryptService = () => {
  const generatePassword = async (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  const comparePassword = async (pw, hash) => {
    return bcrypt.compareSync(pw, hash);
  };

  return {
    generatePassword,
    comparePassword,
  };
};

module.exports = bcryptService;
