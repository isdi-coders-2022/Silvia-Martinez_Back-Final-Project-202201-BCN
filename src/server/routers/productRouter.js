const express = require("express");
const getAllProducts = require("../controllers/productControllers");

const router = express();

router.get("/list", getAllProducts);

module.exports = router;
