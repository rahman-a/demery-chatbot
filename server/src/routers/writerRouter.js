import express from 'express'
const router  = express.Router()

import { 
    createNewWriter, 
    writerLogin,
    writerEdit,
    getWriterData,
    getWriterDataById,
    getAllWriters,
    changeWriterAvatar,
    toggleWriterAccess,
    isClientAuthorized,
    writerLogout,
    writerDelete
} from '../controllers/writerController.js'
import {avatarUpload} from '../middleware/upload.js'
import {isAuth, isAdmin} from '../middleware/auth.js'

router.post('/register', isAuth, isAdmin, avatarUpload.single('avatar'),createNewWriter)
router.post('/login', writerLogin)
router.post('/logout', isAuth, writerLogout)
router.get('/auth', isAuth, isClientAuthorized)
router.get('/info', isAuth, getWriterData)
router.get('/all', isAuth, isAdmin, getAllWriters)
router.patch('/edit/:id?', isAuth, isAdmin, writerEdit)
router.patch('/avatar/:id?', isAuth, isAdmin, avatarUpload.single('avatar'), changeWriterAvatar)
router.patch('/access/:id', isAuth, isAdmin, toggleWriterAccess)
router.delete('/delete/:id', isAuth, isAdmin, writerDelete)
router.get('/:id', isAuth, isAdmin, getWriterDataById)


export default router 