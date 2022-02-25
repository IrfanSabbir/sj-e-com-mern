const multer = require('multer')

const MIME_TYPE_MAP ={
    "image/jpg":"jpg",
    "image/png":"png",
    "image/jpeg":"jpeg"
}

const fileUpload = multer({
    storage: multer.diskStorage ({
        destination: (req, file, cb)=>{
            cb(null, 'uploads/image')
        },
        filename : (req, file, cb) =>{
            const ext = MIME_TYPE_MAP[file.mimetype]
            const key = file.originalname.split(".")[0]+"_" +file.fieldname +"_" +new Date().getTime()
            cb(null, key + '.'+ ext  )
        }
    }),
    fileFilter: (req, file, cb)=>{
        const isValid = !! MIME_TYPE_MAP[file.mimetype]
        const error = isValid ? null : new Error('Invalid mime type')
        cb(error, isValid)
    }
})

module.exports = fileUpload