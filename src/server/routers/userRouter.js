const express = require("express");

const getUser = require("../controllers/userController");

const router = express();

router.get("/perfil", getUser);

module.exports = router;
