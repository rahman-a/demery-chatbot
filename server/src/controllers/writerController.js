import Channel from '../models/channelModel.js'
import Writer from '../models/writerModel.js'

export const createNewWriter = async(req, res, next) => {
    const {email, userName} = req.body 
    const newWriter = new Writer({
        image:req.fileName,
        ...req.body
    })

    try {
        if(!userName) {
            res.status(400)
            throw new Error('user name is required')
        }
        if(!email) {
            res.status(400)
            throw new Error('E-mail is required')
        }
        let isExist = await Writer.findOne({email})
        if(isExist) {
            res.status(400)
            throw new Error('this E-mail already exist, please choose another E-mail Address')
        }
        if(!isExist) {
            isExist = await Writer.findOne({userName})
            if(isExist) {
                res.status(400)
                throw new Error('this user name already exist, please choose another user name')
            }
        }
       await newWriter.save()
        res.status(201).send({message:'The Account has been created'})
    } catch (error) {
        next(error)
    }
}

export const writerLogin = async(req, res, next) => {
    const {info, password} = req.body
    try {
        const writer = await Writer.findByCredential(info, password, res)
        const token = await writer.generateToken()
        res.cookie('tk.id', token, {httpOnly:true, maxAge:1000 * 60 * 60 * 24})
        const writerData = writer.toAuthJSON()
        res.send({writerData,expireAt: expireAt(1)})
    } catch (error) {
        next(error)
    }
}

export const getWriterData = async (req, res, next) => {
    try {
        res.status(200).send({writer:req.writer})
    } catch (error) {
        next(error)        
    }
}

export const getWriterDataById = async (req, res, next) => {
    const {id} = req.params 
    try {
        const writer = await Writer.findById(id) 
        if(!writer) {
            res.status(404) 
            throw new Error('No Data Found')
        }
        res.status(200).send({writer})
    } catch (error) {
        next(error)
    }
}

export const getAllWriters = async(req, res, next) => {
    const {name} = req.query
    let searchFilter = {} 
    try {
        let writers = []
        if(name){
            searchFilter = {
                fullName:{
                    $regex:name,
                    $options:'i'
                }
            }
            const allWriters = await Writer.find({...searchFilter})
            if(!allWriters || allWriters.length === 0){
                res.status(404)
                throw new Error('No Writers Found')
            }
            writers = allWriters.map(writer => {
                return {id:writer._id, name:writer.fullName}
            })
        }else {
            writers = await Writer.find({}) 
            if(!writers || writers.length === 0){
                res.status(404)
                throw new Error('No Writers Found')
            }
        }
        res.send({writers})
    } catch (error) {
        next(error)
    }
}

export const writerLogout = async(req, res, next) => {
    try {
        req.writer.tokens = req.writer.tokens.filter(token => token.token !== req.token)
        await req.writer.save()
        res.clearCookie('tk.id')
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const writerEdit = async (req, res, next) => {
    const {id} = req.params 
    const data = req.body
    try {
        let writer = null
        if(id) {
            writer = await Writer.findById(id) 
        }else {
            writer = req.writer
        }
        for(let key in data) {
            if(data[key]){
                writer[key] = data[key]
            }
        }
        await writer.save()
        const writerData = writer.toAuthJSON()
        res.send({message:'The Account has updated', writerData})
    } catch (error) {
        next(error)
    }
}

export const changeWriterAvatar = async(req, res, next) => {
    const {id} = req.params 
    try {
        let writer = null 
        if(id) {
            writer = await Writer.findById(id)
        }else {
            writer = req.writer
        }
        writer.image = req.fileName
        await writer.save()
        const writerData = writer.toAuthJSON()
        res.status(200).send({message:'the image has been uploaded', writerData})
    } catch (error) {
        next(error) 
    }
}

export const toggleWriterAccess = async (req, res, next) => {
    const {id}  = req.params 
    try {
        const writer = await Writer.findById(id)
        if(!writer) {
            res.status(400)
            throw new Error('The Account not found')
        }
        writer.isActive = !writer.isActive 
        await writer.save()
        if(writer.isActive) {
            res.status(200).send({message:'The Block has been removed'})
        }else {
            res.status(200).send({message:'The Writer has been blocked'})
        }
    } catch (error) {
        next(error)
    }
}

export const writerDelete = async (req, res, next) => {
    const {id} = req.params 
    try {
        const writer = await Writer.findById(id)
        if(!writer) {
            res.status(400)
            throw new Error('The Account not found')
        }
        await writer.remove()
        res.status(200).send({
            message:'The account has been Deleted'
        }) 

    } catch (error) {
        next(error)
    }
}

export const listAllChannels = async (req, res, next) => {
    const {id} = req.params

    try {
        let channels = null
        const writer = await Writer.findById(id)
        if(writer.isAdmin){
            channels = await Channel.find({})
        }else {
            const writer = await Writer.findById(id).populate('channels')
            channels = writer.channels
        }
        if(!channels || channels.length === 0){
            res.status(404)
            throw new Error('No Channels Found')
        }
        res.send({channels})       
    } catch (error) {
        next(error)
    }
}


export const isClientAuthorized = async (req, res, next) => {
    try {
        if(req.cookies['tk.id']) {
            res.status(200).send({isAuth:true})
        }else {
            res.status(200).send({isAuth:false})
        }       
    } catch (error) {
        next(error)
    }
}

function expireAt(day) { 
    const today = new Date()
    const expiry = new Date(today)
    return expiry.setDate(today.getDate() + day)
}