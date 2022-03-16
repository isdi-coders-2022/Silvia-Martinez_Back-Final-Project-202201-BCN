const express = require("express");
const { validate, Joi } = require("express-validation");
const multer = require("multer");
const { userRegister, userLogin } = require("../controllers/userController");

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

const UserLoginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post(
  "/register",
  upload.single("picture"),
  validate(UserRegisterSchema),
  userRegister
);
router.post("/login", validate(UserLoginSchema), userLogin);
module.exports = router;
