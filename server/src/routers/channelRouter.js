import express from 'express'
const router = express.Router()

import {
    createChannel,
    editChannel,
    deleteChannel
} from '../controllers/channelControllers.js'

import {isAuth, isAdmin} from '../middleware/auth.js'

import {uploadHandler} from '../middleware/upload.js'

router.post('/new', isAuth, isAdmin, uploadHandler.single('image'), createChannel)
router.patch('/edit/:id', isAuth, isAdmin, uploadHandler.single('image'), editChannel)
router.delete('/delete/:id', isAuth, isAdmin, deleteChannel)
export default router