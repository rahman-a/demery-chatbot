import express from 'express'
const router  = express.Router()
import {isAuth} from '../middleware/auth.js'
import {createTimed, 
    listBroadcastBlocks, 
    deleteTimedBlock,
    getTimedBlocks
} from '../controllers/timedControllers.js'



router.post('/new', isAuth, createTimed)
router.get('/:channel', isAuth, listBroadcastBlocks)
router.get('/blocks/:channel', isAuth, getTimedBlocks)
router.delete('/:id', isAuth, deleteTimedBlock)

export default router