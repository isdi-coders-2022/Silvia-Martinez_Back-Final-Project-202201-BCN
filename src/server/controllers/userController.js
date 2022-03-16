const debug = require("debug")("wallaplop: user: controller:");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const User = require("../../db/models/User");
const uploadPicture = require("../../utils/uploadPicture");

const userRegister = async (req, res, next) => {
  const user = req.body;

  try {
    const username = await User.findOne({ username: user.username });

    if (username) {
      debug(chalk.green("username taken"));
      const error = new Error("username taken");
      error.status = 400;
      next(error);
      return;
    }

    const password = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({ ...user, password });

    const url = await uploadPicture(req, "users-pictures", newUser.id);

    await User.findByIdAndUpdate(newUser.id, {
      picture: url,
    });

    debug(chalk.bold.bgBlue.magenta(`Created new user: ${user.username}`));
    res.status(201).json({ name: user.name, username: user.username });
  } catch (error) {
    error.status = 500;
    debug(chalk.italic.bold.bgRed.green(`failed to create user:${error}`));
    error.message = `failed to create user:${error}`;
    next(error);
  }
};

module.exports = userRegister;
