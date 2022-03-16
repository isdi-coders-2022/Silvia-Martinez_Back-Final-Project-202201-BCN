const express = require("express");
const { validate, Joi } = require("express-validation");
const multer = require("multer");
const userRegister = require("../controllers/userController");

const upload = multer({
  dest: "uploads",
});

const router = express();

const UserRegisterSchema = {
  body: Joi.object({
    name: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post(
  "/register",
  upload.single("picture"),
  validate(UserRegisterSchema),
  userRegister
);

module.exports = router;
