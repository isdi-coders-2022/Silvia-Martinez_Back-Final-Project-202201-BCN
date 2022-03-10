const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const productRouter = require("./routers/productRouter");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/products", productRouter);

module.exports = app;
