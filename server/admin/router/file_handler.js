const express = require("express")

const router = express.Router()
const auth_check = require("../middleware/auth_check")
const upload = require('../../middleware/image')




router.post("/thumbnail", auth_check ,upload.single('thumbnail'), (req, res)=>{
    try {
        let thumb_url =""
        if(req.file){
            thumb_url = req.file.destination+"/"+req.file.filename
        }
        res.status(200).json({
            message:"File url added to reponse",
            thumb_url,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:"Can't uplaod file",
            thumb_url:"",
            error:true
        })
    }
})



module.exports = router