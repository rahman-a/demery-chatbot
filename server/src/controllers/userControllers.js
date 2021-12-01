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
        res.status(201).send({
            id:newUser._id,
            success:true,
            message:'The Account has been created'
        })
    } catch (error) {
        next(error)
    }
}

export const userLogin = async(req, res, next) => {
    const {info, password} = req.body
    try {
        const user = await User.findByCredential(info, password, res)
        const token = await user.generateToken()
        const userData = user.toAuthJSON()
        res.send({
            id:userData._id, 
            expireAt: expireAt(7),
            message:'The User has Logged in successfully',
            success:true,
            token
        })
    } catch (error) {
        next(error)
    }
}

export const getUserData = async (req, res, next) => {
    try {
        res.status(200).send({
            success:true,
            user:req.user
        })
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
        res.status(200).send({
            success:true,
            user
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async(req, res, next) => {
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
        res.send({
            success:true,
            users
        })
    } catch (error) {
        next(error)
    }
}

export const userLogout = async(req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.clearCookie('token')
        res.send({
            success:true,
            message:'The User has Logged out successfully'
        })
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
        res.send({
        id:user._id,
        success:true,
        message:'The Account has been updated'
    })
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
        res.status(200).send({
            id:user._id,
            message:'the image has been uploaded', 
            success:true
        })
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
            res.status(200).send({
                success:true,
                message:'The Block has been removed'
            })
        }else {
            res.status(200).send({
                success:true,
                message:'The user has been blocked'
            })
        }
    } catch (error) {
        next(error)
    }
}

export const userDelete = async (req, res, next) => {
    const {id} = req.params 
    try {
        let user = null 
        if(id) {
            user = await User.findById(id)
        }else {
            user = req.user
        }
        if(!user) {
            res.status(400)
            throw new Error('The Account not found')
        }
        const userId = user._id
        await user.remove()
        res.status(200).send({
            id:userId,
            success:true,
            message:'The account has been Deleted'
        }) 

    } catch (error) {
        next(error)
    }
}

export const listAllChannels = async (req, res, next) => {
    const {id} = req.params
    const {skip, page, name} = req.query
    let searchFilter = {}
    try {
        let channels = null
        if(name) {
            searchFilter = {
                name: {
                    $regex:name,
                    $options:'i'
                }
            }
        }
        if(id){
            const user = await User.findById(id).populate({
                path:'channels',
                options:{
                    limit:parseInt(page) || 5,
                    skip:parseInt(skip)
                }
            })
            
            channels = user.channels
        }else {
            channels = await Channel.find({...searchFilter})
            .skip(parseInt(skip)).limit(parseInt(page) || 5)  
        }
        if(!channels || channels.length === 0){
            res.status(404)
            throw new Error('No Channels Found')
        }
        res.send({
            success:true,
            channels
        })       
    } catch (error) {
        next(error)
    }
}

export const subscribeToChannel = async (req, res, next) => {
    const {channelId} = req.body 
    try {
        await req.user.subscribe(channelId)
        res.send({
            success:true,
            message:'Subscription has been Confirmed'
        })
    } catch (error) {
        next(error)
    }
}

export const unsubscribeToChannel = async (req, res, next) => {
    const {channelId} = req.body 
    try {
        await req.user.unsubscribe(channelId)
        res.send({
            success:true,
            message:'UnSubscription has been Confirmed'
        })
    } catch (error) {
        next(error)
    }
}

// user dialogues controllers
export const getUserDialogue = async (req, res, next) => {
    const {channelId} = req.params
    const {skip, count} = req.query
    try {
        const dialogues = await Dialogue.find({channel:channelId, user:req.user._id})
        .sort({createdAt:-1}).skip(parseInt(skip)).limit(parseInt(count) || 10)
        if(!dialogues || dialogues.length === 0){
            const block = await Block.findOne({role:'init', channel:channelId})
            if(!block) throw new Error('No Dialogues Found')
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
            res.send({
                success:true,
                blocks
            })
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
        res.send({
            success:true,
            block
        })
    } catch (error) {
        next(error)
    }
}

export const deleteRecords = async(req, res, next) => {
    const {channelId} = req.params 
    try {
        await Dialogue.deleteMany({channel:channelId, user:req.user._id})
        res.send({
            success:true,
            message:'Records has been deleted'
        })
    } catch (error) {
        next(error)
    }
}


function expireAt(day) { 
    const today = new Date()
    const expiry = new Date(today)
    return expiry.setDate(today.getDate() + day)
}