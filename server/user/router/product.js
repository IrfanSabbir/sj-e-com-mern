const express = require("express")

const router = express.Router()
const productController = require('../controller/product')
const auth_check = require("../middleware/auth_check")


router.get("/", productController.getproducts)
router.get("/:product_id", productController.getProductDetails)
router.post("/feedback/:product_id", auth_check ,productController.addFeedback)




module.exports = router