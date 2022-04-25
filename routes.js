import express from 'express'
import {PostView,PostUpdateView, PostDestroyView, PostGetUser, PhotoManipulateView } from './controller.js'
const router= express.Router();
import multer from "multer" 
import swaggerUi from 'swagger-ui-express'
export const upload = multer({ dest: "upload/" })

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
router.post('/post', upload.single('Banner'), PostView)
router.patch('/update/:id', PostUpdateView)
router.delete('/delete/:id', PostDestroyView )
router.get('/:slug', PostGetUser)
router.post('/make/dp/:slug', upload.single('User_Photo'), PhotoManipulateView)

export default router;