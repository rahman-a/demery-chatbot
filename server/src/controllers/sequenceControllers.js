import Sequence from "../models/sequenceModel.js";
// import Block from "../models/blockModel.js"

export const createNewSequence = async (req, res, next) => {
    const {title} = req.body 
    const sequence = new Sequence(req.body)
    try {
        const sequenceBlock = await Sequence.find({title})
        if(sequenceBlock.length > 0) {
            res.status(400)
            throw new Error('This Group Already Exist, Please choose another name')
        }
        await sequence.save()
        res.status(201).send({group:sequence})
    } catch (error) {
        next(error)
    }
}

export const listSequenceGroups = async (req, res, next) => {
    try {
        const groups = await Sequence.find({})
        if(!groups || groups.length === 0){
            res.status(404)
            throw new Error('No Sequence Groups Found')
        }
        res.send({groups})
    } catch (error) {
        next(error)
    }
}

export const deleteSequenceGroup = async(req, res, next) => {
    const {id} = req.params 
    try {
        const group = await Sequence.findById(id)
        if(!group) {
            res.status(404)
            throw new Error('No Group Found')
        }
        await group.remove()
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}