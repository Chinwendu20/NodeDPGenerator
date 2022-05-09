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
const connectionString = process.env.HEROKU_POSTGRESQL_PINK_URL

export const connect_pool = new Pool({
	connectionString,
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

