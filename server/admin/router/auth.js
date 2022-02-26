const express = require("express")

const router = express.Router()
const authController = require('../controller/auth')
const upload = require('../../middleware/image')
const auth_check = require("../middleware/auth_check")


router.post("/signup",authController.signUp)
router.post("/login" ,authController.logIn)


module.exports = router