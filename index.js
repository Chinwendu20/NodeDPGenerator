import express from 'express'
import bodyParser from 'body-parser'
import approutes from './routes.js'
import { pgSession } from './config.js'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()



const app = express()
const port = 3000




app.use(cors())

app.use(bodyParser.json())
app.use(expressSession({
  store:pgSession,
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
            secure: false,
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 24,
        },

}))


app.use("", approutes)

app.listen(port, ()=>console.log(` Server running on ${(process.env.host_name)}:${port}`))