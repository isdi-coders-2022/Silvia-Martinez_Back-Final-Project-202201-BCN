const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  price: { type: String, required: true },
  title: { type: String },
  description: { type: String, required: true },
  category: { type: String, required: true },
  picture: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  adress: { type: String },
});

const Product = model("Product", ProductSchema, "products");

module.exports = Product;
