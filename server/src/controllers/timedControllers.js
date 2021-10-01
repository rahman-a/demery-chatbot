import TimedBlock from "../models/TimesBlocks.js";
import Block from '../models/blockModel.js'
import Dialogue from "../models/dialogueModel.js";


export const createTimed = async (req, res, next) => {
    const newTimedBlock = new TimedBlock(req.body)
    try {
        const timedBlock = await newTimedBlock.save()
        const block = await Block.findById(timedBlock.block)
        res.status(201).send({block})
    } catch (error) {
        next(error)
    }
}

export const listBroadcastBlocks = async(req, res,next) => {
    const {channel} = req.params 
    const {type} = req.query
    try {
        const timedBlocks = await TimedBlock.find({channel, type})
        if(!timedBlocks || timedBlocks.length === 0) {
            res.status(404)
            throw new Error('No Blocks Found')
        }
        const blocks = await Promise.all(timedBlocks.map(async block => {
            const getBlock = await Block.findById(block.block)
            return getBlock
        }))
        res.send({blocks})
    } catch (error) {
        next(error)
    }
}

export const getTimedBlocks = async (req, res, next) => {
    const {channel} = req.params 
    try {
        const timedBlocks = await TimedBlock.find({
            channel, 
            isActive:true, 
            date:{$lt: new Date().toISOString()}
        })
        if(!timedBlocks || timedBlocks.length === 0){
            res.status(404)
            throw new Error('No Blocks Found')
        }
        timedBlocks.forEach(async block => {
            block.isActive = false 
            await block.save()
        });
        const blocks = await Promise.all(timedBlocks.map(async timed => {
            const block =  await Block.findById(timed.block) 
            const newDialogue = new Dialogue({
                channel,
                user:req.writer?._id ||  req.user._id,
                response:block._id
            })
            await newDialogue.save()
            return block
        }))
        res.send({
            success:true,
            blocks
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTimedBlock = async(req, res, next) => {
    const {id} = req.params
    try {
        const block = await TimedBlock.findOne({block:id})
        if(!block){
            res.status(404)
            throw new Error('The Block doesn\'t exist')
        }
        await block.remove() 
        res.send({blockId:id})
    } catch (error) {
        next(error)
    } 
}