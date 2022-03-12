const express = require("express");

const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
} = require("../controllers/productControllers");
const auth = require("../middlewares/auth");

const router = express();

router.get("/list", getAllProducts);
router.get("/user", auth, getUserProducts);
router.delete("/:idProduct", auth, deleteProduct);
router.post("/create", auth, createProduct);

module.exports = router;
