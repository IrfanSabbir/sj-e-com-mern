const express = require("express");

const router = express.Router();

const authRouter = require("./router/auth");
const productRouter = require("./router/product");

router.use("/auth", authRouter);
router.use("/product", productRouter);

module.exports = router;
