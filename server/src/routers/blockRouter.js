import express from 'express'
const router = express.Router()

import {
    createBlock,
    getAllBlocks,
    editBlock,
    deleteBlock
} from '../controllers/blockControllers.js'

import {isAuth} from '../middleware/auth.js'
import {uploadHandler} from '../middleware/upload.js'

router.post('/new', isAuth, uploadHandler.single('image'), createBlock)
router.get('/all/:channel', isAuth, getAllBlocks)
router.put('/edit', isAuth, uploadHandler.single('image'), editBlock)
router.delete('/:id', isAuth, deleteBlock)

export default router