const Admin = require('../../model/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next)=>{
    try {
        const {email, password} = req.body
        const aminExist = await Admin.findOne({email:email})
        if(aminExist){
            throw new Error("Email already in use")
        }
        if(password.length <5){
            throw new Error("Password must contain atleast 5 character")
        }
     
        const hashedPassword = await bcrypt.hash(password, 12)

        const admin = new Admin({
            name:req.body.name,
            email:email,
            password:hashedPassword,
            role: "official"
        })

        await admin.save()
 

        const token = jwt.sign(
              {id:admin._id, email:admin.email},
              process.env.JWT_SECRET_KEY,
              {expiresIn:'1d' }
              )

        res.status(200).json({
            message:"SignUp successful",
            token,
            admin:{
                name:admin.name,
                email:admin.email,
            },
            error:false
        })
    } catch (error) {
        res.status(400).json({
            status:"unsuccessful SignUp, try again please.",
            message:error.message,
            error:true
        })
    }
}

exports.logIn = async (req, res, next)=>{
    try {
        const {email, password} = req.body
         const admin = await Admin.findOne({email:email, role: 'official'})
         if(!admin){
             throw new Error("Invalid email, try again!")
         }

         const isValidPass = await bcrypt.compare( password , admin.password)
         if(!isValidPass){
            throw new Error("Invalid password, try again!")
         }

         const token = jwt.sign(
            {id:admin._id, email:admin.email},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'1d' }
         )
         res.status(200).json({
             message:"Successful Login",
             token,
             admin:{
                 name:admin.name,
                 email:admin.email,
                 image_url:admin.image_url,

             },
             error:false
         })
    } catch (error) {
        res.status(400).json({
            status:"Unsuccessful Login",
            message:error.message,
            error:true
        })
    }
}
