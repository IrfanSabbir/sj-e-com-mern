const Product = require("../../model/product")

const fs = require('fs')

exports.createProduct = async (req, res)=>{
    try {
        let thumbnail = ""
        if(req.file){
            thumbnail = req.file.destination+"/"+req.file.filename
        }
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            thumbnail: thumbnail,
            status: req.body.status,
        })
        await product.save()
        res.status(200).json({
            message:"product info created",
            body:product,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            status:"try again please.",
            message:error.message,
            error:true
        })
    }
}

exports.getProductDetails = async (req, res)=>{
    try {
        
        const product_id = req.params.product_id
        const product_details = await Product.findOne({_id:product_id})

        
        res.status(200).json({
            message:"Product info",
            body:product_details,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            status:"try again please.",
            message:error.message,
            error:true
        })
    }
}

exports.updateProduct= async (req, res)=>{
    try {
        
        const product_id = req.params.product_id
        const product_details = await Product.findOne({_id:product_id})

        product_details.title = req.body.title || product_details.title
        product_details.description = req.body.description || product_details.description
        product_details.country = req.body.country || product_details.country
        product_details.status = req.body.status || product_details.status

        if(req.body.status === false){
            product_details.status = false
        }

        if(req.file){
            product_details.thumbnail ? fs.unlinkSync(product_details.thumbnail) : null
            product_details.thumbnail = req.file.destination+"/"+req.file.filename
        }

        await product_details.save()
        
        res.status(200).json({
            message:"product info updated",
            body:product_details,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            status:"try again please.",
            message:error.message,
            error:true
        })
    }
}

exports.getProducts= async (req, res)=>{
    try {

        const products = await Product.find().sort({_id:-1})
            .select("title status description thumbnail")

        res.status(200).json({
            message:"Showing Products",
            body:products,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            status:"try again please.",
            message:error.message,
            error:true
        })
    }
}

exports.deleteProduct = async (req, res)=>{
    try {
        
        const product_id = req.params.product_id
        const product = await Product.deleteOne({_id:product_id})

        
        res.status(200).json({
            message:"Product deleted",
            body:product,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            status:"try again please.",
            message:error.message,
            error:true
        })
    }
}