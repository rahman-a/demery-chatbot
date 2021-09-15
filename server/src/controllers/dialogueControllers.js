import Dialogue from "../models/dialogueModel.js";
import Block from "../models/blockModel.js";


export const getUserDialogue = async (req, res, next) => {
    const {channelId, writerId} = req.body 
    try {
        const dialogues = await Dialogue.find({channel:channelId, user:writerId})
        if(!dialogues || dialogues.length === 0){
            const block = await Block.findOne({role:'init'})
            const newDialogue  = new Dialogue({
                channel:channelId,
                user:writerId,
                response:block._id
            })
            await newDialogue.save()
            res.send({block})
        }else {
            const dialogue = dialogues[dialogues.length - 1]
            const block = await Block.findOne({_id:dialogue.response})
            res.send({block})
        }
    } catch (error) {
        next(error)
    }
}

export const getOneBlock = async (req, res, next) =>{
    const {id} = req. params 
    try {
        const block = await Block.findById(id)
        if(!block){
            res.status(404)
            throw new Error('No Block Found')
        }
        res.send({block})
    } catch (error) {
        next(error)
    }
}