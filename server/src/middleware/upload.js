import multer from "multer";
import {fileURLToPath} from 'url'
import path from 'path' 

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 
const uploadsDirectory = path.resolve(__dirname, '../../uploads')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDirectory)
    },
    filename(req, file, cb){
        const fileName = `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
        req.fileName = fileName 
        cb(null, fileName)
    }
})

export const avatarUpload = multer({
    storage,
    limits:{
        fileSize:5000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
            cb(new Error('please upload image with following extension png or jpg'))
        }
        cb(undefined, true)
    }
})

