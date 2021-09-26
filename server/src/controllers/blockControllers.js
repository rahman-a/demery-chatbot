import Block from '../models/blockModel.js'
import Dialogue from '../models/dialogueModel.js'
import TimedBlock from '../models/TimesBlocks.js'


export const createBlock = async (req, res, next) => {
    const blockData = req.body
    blockData.buttons = JSON.parse(blockData.buttons)
    const newBlock = new Block({
        ...blockData,
        image:req.fileName,
        creator:req.writer._id
    }) 
    try {
       const isExist = await Block.findById(blockData._id)
       if(isExist){
           res.status(400)
           throw new Error('This Block Already Exist')
       }
       await newBlock.save()
       res.status(201).send({message:'The Block has Created'})
    } catch (error) {
        next(error)
    }
}

export const editBlock = async(req, res, next) => {
    const blockData = req.body 
    blockData.buttons = JSON.parse(blockData.buttons)
    blockData.image = typeof blockData.image === 'string' 
    ?  blockData.image 
    : req.fileName
    try {
        const block = await Block.findById(blockData._id) 
        if(!block){
            res.status(404)
            throw new Error('No Block Found')
        }
        for(let key in blockData){
            block[key] = blockData[key]
        } 
        await block.save()
        res.send({message:'The Block has updated'})
    } catch (error) {
        next(error)
    }
}

export const getAllBlocks = async(req, res, next) => {
    const {channel} = req.params
    const {name} = req.query
    let searchFilter = {}
    try {
        if(name){
            searchFilter = {
                name:{
                    $regex:name,
                    $options:'i'
                }
            }
        }
        const blocks = await Block.find({channel, ...searchFilter})
        if(!blocks || blocks.length === 0){
            res.status(404)
            throw new Error('No Blocks Found')
        }
        res.send({blocks})
    } catch (error) {
        next(error)
    }
}


export const deleteBlock = async(req, res, next) => {
    const {id} = req.params 
    try {
        const block = await Block.findById(id)
        if(!block){
            res.status(404)
            throw new Error('No Block Found')
        }
        await Dialogue.deleteMany({response:id})
        await TimedBlock.deleteMany({block:id})
        await block.remove()
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}