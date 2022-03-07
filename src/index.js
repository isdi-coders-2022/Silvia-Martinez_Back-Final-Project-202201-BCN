require("dotenv").config();
const debug = require("debug")("wallaplop:root");
const chalk = require("chalk");
const initServer = require("./server/initServer");
const app = require("./server/index");

const port = process.env.PORT || 3089;

(async () => {
  try {
    await initServer(port, app);
  } catch (error) {
    debug(chalk.red(`Error:`, error.message));
  }
})();
