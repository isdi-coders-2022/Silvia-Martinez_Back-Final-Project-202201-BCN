const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  picture: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
