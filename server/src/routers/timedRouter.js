import express from 'express'
const router  = express.Router()
import {isAuth} from '../middleware/auth.js'
import {
    createTimed, 
    listTimedBlocks, 
    deleteTimedBlock,
    getTimedBlocks,
    toggleActivation
} from '../controllers/timedControllers.js'



router.post('/new', isAuth, createTimed)
router.get('/:channel', isAuth, listTimedBlocks)
router.get('/blocks/:channel', isAuth, getTimedBlocks)
router.patch('/:id', isAuth, toggleActivation)
router.delete('/:id', isAuth, deleteTimedBlock)

export default router