import express from 'express'
const router  = express.Router()

import { 
    createNewUser, 
    userLogin,
    userEdit,
    getUserData,
    getUserDataById,
    getAllUsers,
    changeUserAvatar,
    toggleUserAccess,
    listAllChannels,
    userLogout,
    userDelete,
    subscribeToChannel,
    unsubscribeToChannel
} from '../controllers/userController.js'
import {uploadHandler} from '../middleware/upload.js'
import {isUserAuth, isAuth, isAdmin} from '../middleware/auth.js'

router.post('/register', isUserAuth,uploadHandler.single('avatar'),createNewUser)
router.post('/login', userLogin)
router.post('/logout', isUserAuth, userLogout)
router.get('/info', isUserAuth, getUserData)
router.get('/all', isAuth, isAdmin, getAllUsers)
router.patch('/edit/:id?', isUserAuth,userEdit)
router.patch('/avatar/:id?', isUserAuth, uploadHandler.single('avatar'), changeUserAvatar)
router.patch('/access/:id', isAuth, isAdmin, toggleUserAccess)
router.delete('/delete/:id', isUserAuth,userDelete)
router.get('/channels/:id', isUserAuth, listAllChannels)
router.get('/:id', isUserAuth, getUserDataById)
router.patch('/subscribe', isUserAuth, subscribeToChannel)
router.patch('/unsubscribe', isUserAuth, unsubscribeToChannel)

// dialogues routers
router.get('/dialogues/:channelId', isUserAuth, getUserDialogue)
router.get('/block/:blockId/:channelId', isUserAuth,getOneBlock)
router.delete('/dialogues/:channelId', isUserAuth, deleteRecords)

export default router 