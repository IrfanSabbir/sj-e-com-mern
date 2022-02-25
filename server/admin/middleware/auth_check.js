const jwt = require('jsonwebtoken')
const Admin = require('../../model/user')

module.exports = async (req, res, next)=>{
    try {
        if(!req.headers.authorization){
            throw new Error("Authorization header not found")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            throw new Error("Token to found on the header")
        }
        
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET_KEY) 
     

        if(!decodeToken){
            throw new Error("Invalid auth token")
        }
        const exist = await Admin.findOne({_id:decodeToken.id, role: "official"})
        if(!exist){
            throw new Error("Invalid Admin, not exit.")
        }
        
        req.adminData ={
            id : decodeToken.id,
            email: decodeToken.email
        }

        next()

    }
    catch (error) {
        return res.status(404).json({
            status:"Failed to authorize Admin",
            message:error.message,
            error:true
        })
    }
    
}