import dotenv from 'dotenv'
import express from 'express'
import expressSession from 'express-session'
import pg_simple from 'connect-pg-simple'
import multer from 'multer'
import pg from 'pg'
import cloudinary from "cloudinary"
const app = express()
const {Pool}=pg
dotenv.config()


export const connect_pool = new Pool({
	user: process.env.user,
	host:process.env.host,
	database:process.env.database,
	password:process.env.password,
	port:process.env.port,
	ssl:{require: true, 
		rejectUnauthorized: false}
})

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
  secure: true
});

export const pgSession = new ((pg_simple)(expressSession))({
	pool: connect_pool,
	table_name: 'session'
})






// const storage = multer.diskStorage({
//   destination: 'upload',
//   filename: file.originalname
// })

// export const imageUpload = multer({
//       storage: storage,
//       limits: {
//         fileSize: 1000000 // 1000000 Bytes = 1 MB
//       },
//       fileFilter(req, file, cb) {
//         if path.extname(file.originalname) != 'jpg'|'jpeg'|'png' { 
//            return cb(new Error('Please upload an image'))
//          }
//        cb(undefined, true)
//     }
// }) 
// const upload = multer({ storage: storage })