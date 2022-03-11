const express = require("express");

const {
  getAllProducts,
  getUserProducts,
} = require("../controllers/productControllers");
const auth = require("../middlewares/auth");

const router = express();

router.get("/list", getAllProducts);
router.get("/user", auth, getUserProducts);

module.exports = router;
