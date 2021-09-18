import Dialogue from "../models/dialogueModel.js";
import Block from "../models/blockModel.js";


export const getUserDialogue = async (req, res, next) => {
    const {channelId} = req.params
    const {skip} = req.query
    try {
        const dialogues = await Dialogue.find({channel:channelId, user:req.writer._id})
        // .sort({_id:-1}).skip(parseInt(skip)).limit(5)
        if(!dialogues || dialogues.length === 0){
            const block = await Block.findOne({role:'init', channel:channelId})
            if(!block) throw new Error('No Dialogues Found, start creating your blocks')
            const newDialogue  = new Dialogue({
                channel:channelId,
                user:req.writer._id,
                response:block._id
            })
            await newDialogue.save()
            res.send({blocks:[block]})
        }else {
            const blocks = await Promise.all(dialogues.map(async dialogue => {
                return await Block.findById(dialogue.response)
            }))
            res.send({blocks})
        }
    } catch (error) {
        next(error)
    }
}

export const getOneBlock = async (req, res, next) =>{
    const {blockId, channelId} = req.params 
    try {
        const block = await Block.findById(blockId)
        if(!block){
                res.status(404)
                throw new Error('No Block Found')
        }
        const newDialogue  = new Dialogue({
            channel:channelId,
            user:req.writer._id,
            response:blockId
        })
        await newDialogue.save()
        res.send({block})
    } catch (error) {
        next(error)
    }
}

export const deleteRecords = async(req, res, next) => {
    const {channelId} = req.params 
    try {
        await Dialogue.deleteMany({channel:channelId, user:req.writer._id})
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}