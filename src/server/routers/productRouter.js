const express = require("express");
const { Joi, validate } = require("express-validation");
const multer = require("multer");

const upload = multer({
  dest: "uploads",
  limits: {
    fileSize: 5000000,
  },
});

const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/productControllers");
const auth = require("../middlewares/auth");

const router = express();

const ProductSchema = {
  body: Joi.object({
    title: Joi.string(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),

    userID: Joi.string(),
    location: Joi.object({
      lat: Joi.number(),
      long: Joi.number(),
    }),
  }),
};

router.get("/list", getAllProducts);
router.get("/user", auth, getUserProducts);
router.delete("/:idProduct", auth, deleteProduct);
router.post("/create", auth, upload.single("picture"), createProduct);
router.put("/:idProduct", auth, validate(ProductSchema), updateProduct);

module.exports = router;
