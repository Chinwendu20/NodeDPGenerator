import express from 'express'
import bodyParser from 'body-parser'
import approutes from './routes.js'
import { pgSession } from './config.js'
import expressSession from 'express-session'
import dotenv from 'dotenv'
dotenv.config()








const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(expressSession({
  store:pgSession,
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
            secure: false,
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 24,
        },

}))


app.use("", approutes)

app.listen(port, ()=>console.log(` Server running on 127.0.0.1:${port}`))