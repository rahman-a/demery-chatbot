import express from 'express'
const router  = express.Router()

import { 
    createNewWriter, 
    writerLogin,
    writerEdit,
    getWriterData,
    getWriterDataById,
    getAllWriters,
    subscribeToChannel,
    unsubscribeToChannel,
    changeWriterAvatar,
    toggleWriterAccess,
    listAllChannels,
    writerLogout,
    writerDelete
} from '../controllers/writerController.js'
import {uploadHandler} from '../middleware/upload.js'
import {isAuth, isAdmin} from '../middleware/auth.js'

router.post('/register', isAuth, isAdmin, uploadHandler.single('avatar'),createNewWriter)
router.post('/login', writerLogin)
router.post('/logout', isAuth, writerLogout)
router.get('/info', isAuth, getWriterData)
router.get('/all', isAuth, isAdmin, getAllWriters)
router.patch('/edit/:id?', isAuth, isAdmin, writerEdit)
router.patch('/avatar/:id?', isAuth, isAdmin, uploadHandler.single('avatar'), changeWriterAvatar)
router.patch('/access/:id', isAuth, isAdmin, toggleWriterAccess)
router.delete('/delete/:id', isAuth, isAdmin, writerDelete)
router.get('/channels/:id', isAuth, listAllChannels)
router.get('/:id', isAuth, isAdmin, getWriterDataById)
router.patch('/subscribe', isAuth, subscribeToChannel)
router.patch('/unsubscribe', isAuth, unsubscribeToChannel)


export default router 