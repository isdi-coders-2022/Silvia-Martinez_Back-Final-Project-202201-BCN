const express = require("express");

const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
} = require("../controllers/productControllers");
const auth = require("../middlewares/auth");

const router = express();

router.get("/list", getAllProducts);
router.get("/user", auth, getUserProducts);
router.delete("/:idProduct", auth, deleteProduct);

module.exports = router;
