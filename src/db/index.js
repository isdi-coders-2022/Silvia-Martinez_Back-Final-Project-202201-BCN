const debug = require("debug")("wallaplop:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDatabase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      mongoose.set("debug", true);
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (doc, ret) => {
          // eslint-disable-next-line no-underscore-dangle,  no-param-reassign
          delete ret.id;
          // eslint-disable-next-line no-underscore-dangle,  no-param-reassign
          delete ret.__v;
        },
      });
      if (error) {
        reject(new Error(`Couldn't connect to the database: ${error.message}`));
        return;
      }
      debug(chalk.bgMagenta("Connected to DB"));
      resolve();
    });
  });

module.exports = connectDatabase;
