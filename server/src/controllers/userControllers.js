import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import Dialogue from '../models/dialogueModel.js'
import Block from '../models/blockModel.js'

export const createNewUser = async(req, res, next) => {
    const {email, userName} = req.body 
    const newUser = new User({
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
        let isExist = await User.findOne({email})
        if(isExist) {
            res.status(400)
            throw new Error('this E-mail already exist, please choose another E-mail Address')
        }
        if(!isExist) {
            isExist = await User.findOne({userName})
            if(isExist) {
                res.status(400)
                throw new Error('this user name already exist, please choose another user name')
            }
        }
       await newUser.save()
        res.status(201).send({message:'The Account has been created'})
    } catch (error) {
        next(error)
    }
}

export const userLogin = async(req, res, next) => {
    const {info, password} = req.body
    try {
        const user = await User.findByCredential(info, password, res)
        const token = await user.generateToken()
        res.cookie('token', token, {httpOnly:true, maxAge:1000 * 60 * 60 * 24})
        const userData = user.toAuthJSON()
        res.send({userData, expireAt: expireAt(1)})
    } catch (error) {
        next(error)
    }
}

export const getUserData = async (req, res, next) => {
    try {
        res.status(200).send({user:req.user})
    } catch (error) {
        next(error)        
    }
}

export const getUserDataById = async (req, res, next) => {
    const {id} = req.params 
    try {
        const user = await User.findById(id) 
        if(!user) {
            res.status(404) 
            throw new Error('No Data Found')
        }
        res.status(200).send({user})
    } catch (error) {
        next(error)
    }
}

export const getAllUser = async(req, res, next) => {
    const {name} = req.query
    let searchFilter = {} 
    try {
        let users = []
        if(name){
            searchFilter = {
                firstName:{
                    $regex:name,
                    $options:'i'
                }
            }
            users = await User.find({...searchFilter})
            if(!users || users.length === 0){
                res.status(404)
                throw new Error('No Users Found')
            }
        }else {
            users = await User.find({}) 
            if(!users || users.length === 0){
                res.status(404)
                throw new Error('No Users Found')
            }
        }
        res.send({users})
    } catch (error) {
        next(error)
    }
}

export const userLogout = async(req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.clearCookie('token')
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const userEdit = async (req, res, next) => {
    const {id} = req.params 
    const data = req.body
    try {
        let user = null
        if(id) {
            user = await User.findById(id) 
        }else {
            user = req.user
        }
        for(let key in data) {
            if(data[key]){
                user[key] = data[key]
            }
        }
        await user.save()
        const userData = user.toAuthJSON()
        res.send({message:'The Account has updated', userData})
    } catch (error) {
        next(error)
    }
}

export const changeUserAvatar = async(req, res, next) => {
    const {id} = req.params 
    try {
        let user = null 
        if(id) {
            user = await User.findById(id)
        }else {
            user = req.user
        }
        user.image = req.fileName
        await user.save()
        const userData = user.toAuthJSON()
        res.status(200).send({message:'the image has been uploaded', userData})
    } catch (error) {
        next(error) 
    }
}

export const toggleUserAccess = async (req, res, next) => {
    const {id}  = req.params 
    try {
        const user = await User.findById(id)
        if(!user) {
            res.status(400)
            throw new Error('The Account not found')
        }
        user.isActive = !user.isActive 
        await user.save()
        if(user.isActive) {
            res.status(200).send({message:'The Block has been removed'})
        }else {
            res.status(200).send({message:'The user has been blocked'})
        }
    } catch (error) {
        next(error)
    }
}

export const userDelete = async (req, res, next) => {
    const {id} = req.params 
    try {
        const user = await User.findById(id)
        if(!user) {
            res.status(400)
            throw new Error('The Account not found')
        }
        await user.remove()
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
        const user = await User.findById(id)
        if(user.isAdmin){
            channels = await Channel.find({})
        }else {
            const user = await user.findById(id).populate('channels')
            channels = user.channels
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

export const subscribeToChannel = async (req, res, next) => {
    const {channelId} = req.body 
    try {
        await req.user.subscribe(channelId)
        await req.user.save()
        res.send({message:'Subscription has been Confirmed'})
    } catch (error) {
        next(error)
    }
}

export const unsubscribeToChannel = async (req, res, next) => {
    const {channelId} = req.body 
    try {
        await req.user.unsubscribe(channelId)
        await req.user.save()
        res.send({message:'UnSubscription has been Confirmed'})
    } catch (error) {
        next(error)
    }
}

// user dialogues controllers
export const getUserDialogue = async (req, res, next) => {
    const {channelId} = req.params 
    try {
        const dialogues = await Dialogue.find({channel:channelId, user:req.user._id})
        if(!dialogues || dialogues.length === 0){
            const block = await Block.findOne({role:'init', channel:channelId})
            if(!block) throw new Error('No Dialogues Found, start creating your blocks')
            const newDialogue  = new Dialogue({
                channel:channelId,
                user:req.user._id,
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
            user:req.user._id,
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
        await Dialogue.deleteMany({channel:channelId, user:req.user._id})
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}


function expireAt(day) { 
    const today = new Date()
    const expiry = new Date(today)
    return expiry.setDate(today.getDate() + day)
}