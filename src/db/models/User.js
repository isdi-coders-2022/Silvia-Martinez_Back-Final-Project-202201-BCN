const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  picture: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
