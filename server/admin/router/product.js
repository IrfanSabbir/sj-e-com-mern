const express = require("express")

const router = express.Router()
const productController = require('../controller/product')
const auth_check = require("../middleware/auth_check")
const upload = require("../../middleware/image")

router.get("/list",auth_check ,productController.getProducts)
router.get("/:product_id",auth_check ,productController.getProductDetails)

router.post("/", auth_check, upload.single('image') , productController.createProduct)

router.put("/:product_id", auth_check, upload.single('image') , productController.updateProduct)

router.delete("/:product_id",auth_check, productController.deleteProduct)




module.exports = router