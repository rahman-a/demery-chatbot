import express from 'express'
const router  = express.Router()

import {
    getUserDialogue,
    getOneBlock
} from '../controllers/dialogueControllers.js'

import {isAuth} from '../middleware/auth.js'

router.post('/', isAuth, getUserDialogue)
router.get('/block/:id', isAuth,getOneBlock)

export default router