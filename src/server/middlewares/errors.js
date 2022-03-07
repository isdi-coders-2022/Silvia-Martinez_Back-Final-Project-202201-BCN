const debug = require("debug");
const chalk = require("chalk");

const errorNotFound = (req, res) => {
  res.status = 404;
  res.json = { error: true, message: "Not found" };
  debug(chalk.bgRedBright.yellow("Not found"));
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message ?? "server error";
  res.status(status).json({ error: message });
  debug(chalk.bgRedBright.yellow("Not found"));
};

module.exports = { errorNotFound, generalError };
