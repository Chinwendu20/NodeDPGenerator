import express from 'express'
import bodyParser from 'body-parser'
import approutes from './routes.js'
import { pgSession } from './config.js'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from"swagger-jsdoc"
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');
const router= express.Router();
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

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
app.use("", approutes)

app.listen(port, ()=>console.log(` Server running on 127.0.0.1:${port}`))