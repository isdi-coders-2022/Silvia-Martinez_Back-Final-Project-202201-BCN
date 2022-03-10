const debug = require("debug")("wallaplop:controllers:");
const chalk = require("chalk");

const User = require("../../db/models/User");

const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({ user });
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

module.exports = getUser;
