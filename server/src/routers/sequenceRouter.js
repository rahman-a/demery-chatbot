import express from 'express'
const router = new express.Router()

import {
    createNewSequence,
    listSequenceGroups,
    deleteSequenceGroup
} from '../controllers/sequenceControllers.js'

import {isAuth} from '../middleware/auth.js'

router.post('/new', isAuth, createNewSequence)
router.get('/:id', isAuth, listSequenceGroups)
router.delete('/:id', isAuth, deleteSequenceGroup)

export default router