const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  price: { type: Number, required: true },
  title: { type: String },
  description: { type: String, required: true },
  category: { type: String, required: true },
  picture: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  location: {
    lat: { type: Number },
    long: { type: Number },
  },
});

const Product = model("Product", ProductSchema, "products");

module.exports = Product;
