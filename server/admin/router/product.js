const express = require("express")

const router = express.Router()
const productController = require('../controller/product')
const auth_check = require("../middleware/auth_check")

router.get("/list",auth_check ,productController.getProducts)
router.get("/:product_id",auth_check ,productController.getProductDetails)

router.post("/",auth_check, productController.createProduct)

router.put("/:product_id", auth_check, productController.updateProduct)

router.delete("/:product_id",auth_check, productController.deleteProduct)




module.exports = router