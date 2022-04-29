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
router.post('/post', upload.single('Banner'), PostView)
router.patch('/update/:id',upload.single('User_Photo'), PostUpdateView)
router.delete('/delete/:id', PostDestroyView )
router.get('/:slug', PostGetUser)
router.post('/make/dp/:slug', upload.single('User_Photo'), PhotoManipulateView)

export default router;