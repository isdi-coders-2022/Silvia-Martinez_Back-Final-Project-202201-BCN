require("dotenv").config();
const debug = require("debug")("wallaplop:root");
const chalk = require("chalk");
const initServer = require("./server/initServer");
const app = require("./server/index");
const connectDatabase = require("./db");
// eslint-disable-next-line no-unused-vars
const firebase = require("./server/firebase/firebase");

const port = process.env.PORT || 3089;
const connectDB = process.env.MONGO_STRING;

(async () => {
  try {
    await initServer(port, app);
    await connectDatabase(connectDB);
  } catch (error) {
    debug(chalk.red(`Error:`, error.message));
  }
})();
