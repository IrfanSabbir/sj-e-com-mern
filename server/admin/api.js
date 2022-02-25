const express = require("express")

const router = express.Router()
const authRouter = require('./router/auth')
const productRoute = require("./router/product")

router.use("/auth", authRouter)
router.use("/product", productRoute)

module.exports = router