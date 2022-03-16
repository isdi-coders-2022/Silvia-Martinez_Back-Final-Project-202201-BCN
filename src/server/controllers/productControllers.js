const debug = require("debug")("wallaplop:controllers:");
const chalk = require("chalk");
const Product = require("../../db/models/Product");
const uploadPicture = require("../../utils/uploadPicture");

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

const deleteProduct = async (req, res, next) => {
  const { idProduct } = req.params;

  try {
    const product = await Product.findByIdAndDelete(idProduct);

    if (product) {
      res.json();
    } else {
      const error = new Error("Product not found");
      debug(chalk.red(`${error}`));
      error.status = 404;
      next(error);
    }
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const newProduct = req.body;
  const userID = req.userId;
  const { lat, long } = req.body;

  try {
    const createdProduct = await Product.create({
      ...newProduct,
      userID,
      location: { lat, long },
    });
    if (createdProduct) {
      const url = await uploadPicture(
        req,
        "products-pictures",
        createdProduct.id
      );

      const productWithImage = await Product.findByIdAndUpdate(
        createdProduct.id,
        {
          picture: url,
        },
        { new: true }
      );

      res.status(201).json(productWithImage);
    } else {
      const error = new Error("Product not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { idProduct } = req.params;
  const reqProduct = req.body;
  const userID = req.userId;

  try {
    const product = await Product.findById(idProduct);

    if (product) {
      if (product.userID.toString() === userID) {
        const updatedProduct = await Product.findByIdAndUpdate(
          idProduct,
          reqProduct,
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } else {
        const error = new Error("Unauthorized to update this product");
        error.status = 401;
        next(error);
      }
    } else {
      const error = new Error("Product not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
