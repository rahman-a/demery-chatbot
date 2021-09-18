import express from 'express'
const router  = express.Router()

import {
    getUserDialogue,
    getOneBlock,
    deleteRecords
} from '../controllers/dialogueControllers.js'

import {isAuth} from '../middleware/auth.js'

router.get('/:channelId', isAuth, getUserDialogue)
router.get('/block/:blockId/:channelId', isAuth,getOneBlock)
router.delete('/:channelId', isAuth, deleteRecords)

export default router