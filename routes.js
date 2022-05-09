import express from 'express'
import dotenv from 'dotenv'
import {PostView,PostUpdateView, PostDestroyView, PostGetUser, PhotoManipulateView } from './controller.js'
import multer from "multer" 
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from"swagger-jsdoc"
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');
const router= express.Router();
dotenv.config()



export const upload = multer({ dest: "upload/" })

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
router.post('/campaign', upload.single('banner'), PostView)
router.patch('/campaign/:id',upload.single('user_photo'), PostUpdateView)
router.delete('/campaign/:id', PostDestroyView )
router.get('/:slug', PostGetUser)
router.post('/make/dp/:slug', upload.single('user_photo'), PhotoManipulateView)

export default router;