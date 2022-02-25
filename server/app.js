const path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

app.use(cors());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods','POST,GET,FATCH,PUT,DELETE,OPTIONS');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200)
    }
    next()
})

const db = async ()=>{
    try {
        const success = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Mongoose is connected" )
    } catch (error) {
        console.log("mongoose: "+ error)
    }
}

db()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/uploads/image', express.static(path.join('uploads','image')))

const adminApi = require('./admin/api')
const userApi = require('./user/api')


app.use('/admin_api',adminApi)
app.use('/user_api',userApi)


app.use((req, res, next)=>{
    return res.status(404).json({
        message:"Please add a valid api call!",
        error:true
    })
})

app.use((error, req, res, next)=>{
    return res.status(404).json({
        message: error.message ||  "Something went wrong, Please try again",
        error:true
    })
})

app.listen(process.env.PORT, ()=>{
    console.log("listning to port")
})