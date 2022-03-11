const debug = require("debug")("wallaplop:controllers:");
const chalk = require("chalk");
const Product = require("../../db/models/Product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

const getUserProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      userID: req.userId,
    });
    res.status(200).json({ products });
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

module.exports = { getAllProducts, getUserProducts };
