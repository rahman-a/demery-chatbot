import Channel from '../models/channelModel.js'
import Writer from '../models/writerModel.js'

export const createChannel = async (req, res, next) => {
    const {name, description} = req.body
    const data = req.body 
    const newChannel = new Channel({
        ...data,
        image:req.fileName
    })
    try {
        if(!name){
            res.status(400)
            throw new Error('Name is Required')
        }
        if(!description){
            res.status(400)
            throw new Error('Description is Required')
        }
        const isExist = await Channel.findOne({name:data.name})
        if(isExist){
            res.status(400)
            throw new Error('There\'s channel already exist with that name, please choose another name')
        }
        await newChannel.save()
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const getOneChannel = async(req, res, next) => {
    const {id} =  req.params 
    try {
        const channel  = await Channel.findById(id)
        if(!channel){
            res.status(404)
            throw new Error('No Channel Found')
        }
        res.send({channel})
    } catch (error) {
        next(error)
    }
}

export const editChannel = async(req, res, next) => {
    const data = req.body
    const {id} = req.params
    try {
        const channel = await Channel.findById(id)
        if(req.fileName){
            channel.image = req.fileName
        }
        if(data.name){
            channel.name = data.name 
        }
        if(data.description){
            channel.description = data.description
        }
        if(req.fileName){
            channel.image = req.fileName
        }
        if(data.writers && data.writers.length > 0){
           data.writers.split(',').forEach(async w => {
                const writer = await Writer.findById(w)
                writer.channels = writer.channels.concat(id)
                await writer.save()
            })
        }
        await channel.save()
        res.send({message:'The Channel has updated'})
    } catch (error) {
        next(error)
    }
}

export const deleteChannel = async (req, res, next) => {
    const {id} = req.params
    try {
        const channel = await Channel.findById(id)
        if(!channel) {
            res.status(404)
            throw new Error('No Channel Found')
        }
        const writers = await Writer.find({channels:{_id:id}})
        writers.forEach(async wr => {
           const writer = await Writer.findById(wr._id)
           if(writer) {
               writer.channels = writer.channels.filter(ch => ch.toString() !== id.toString())
               await writer.save()
           }
       })
        await channel.remove()
        res.send({message:'The Channel has removed'})
    } catch (error) {
        next(error)
    }
}