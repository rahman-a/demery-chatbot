import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import Dialogue from '../models/dialogueModel.js'
import Block from '../models/blockModel.js'
import Trial from '../models/trialModel.js'
import randomString from 'randomstring'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createNewUser = async(req, res, next) => {
    const {email, userName} = req.body 
    const newUser = new User({
        image:req.fileName,
        ...req.body
    })

    try {
        let isExist = email && await User.findOne({email})
        if(isExist) {
            res.status(400)
            throw new Error('this E-mail already exist, please choose another E-mail Address')
        }
        if(!isExist && userName) {
            isExist = await User.findOne({userName})
            if(isExist) {
                res.status(400)
                throw new Error('this user name already exist, please choose another user name')
            }
        }
       const user = await newUser.save()
       const token = await user.generateToken()
        res.status(201).send({
            id:newUser._id,
            success:true,
            token,
            expiryAt:expireAt(7),
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
        if(req.isTrial) {
            res.json({
                success:false,
                message:'This is Trial Version, please signup first'
            })
            return
        }
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
        req.user.token = ''
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
        if(req.isTrial) {
            res.status(200).send({
                success:false,
                message:'This is Trial version, please signup first'
            })
            return 
        }
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
        if(req.isTrial) {
            res.json({
                success:false,
                message:'This is Trial Version, please signup first'
            })
            return
        }
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
        if(req.isTrial) {
            res.json({
                success:false,
                message:'This is Trial Version, please signup first'
            })
            return
        }
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
        await Dialogue.deleteMany({user: userId})
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
        if(req.isTrial) {
            res.json({
                success:false,
                message:'This is Trial Version, please signup first'
            })
            return
        }
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
        const dialogues = await Dialogue.find({channel:channelId, user:req.user?._id})
        .sort({createdAt:-1}).skip(parseInt(skip)).limit(parseInt(count) || 10)
        if(!dialogues || dialogues.length === 0){
            const block = await Block.findOne({role:'init', channel:channelId})
            if(!block) throw new Error('No Dialogues Found')
            if(req.isTrial) {
                res.send({success:true, blocks:[block]})
            }else {
                const newDialogue  = new Dialogue({
                    channel:channelId,
                    user:req.user._id,
                    response:block._id
                })
                await newDialogue.save()
                res.send({blocks:[block]})
            }
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
        if(req.isTrial) {
            res.json({
                success:false,
                message:'This is Trial Version, please signup first'
            })
            return
        }
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


export const generateAccessToken = async (req, res, next) => {
    const {phoneId, email} = req.query
    try {
        if(email) {
            const user = await User.findOne({email})
            if(!user) {
                res.status(400)
                throw new Error('This Email isn\'t linked to any account')
            }
            const token = await user.generateToken()
            res.json({
                success:true,
                _id:user._id,
                expiryAt:expireAt(7),
                token
            })
        }else {
            if(!phoneId) {
                res.status(400)
                throw new Error('Please Provide The Phone Id')
            }
            const trialToken = await generateTrialToken(phoneId)
            res.json({
                success:true,
                expiryAt:expireAt(7),
                token:trialToken
            })
        }
    } catch (error) {
        next(error)
    }
} 

async function generateTrialToken (phoneId) {
    let trialToken = await Trial.findOne({phoneId})
    const random = randomString.generate()
    const cryptRandomString = await bcrypt.hash(random, 10)
    if(!trialToken) {      
        trialToken = new Trial({auth:cryptRandomString, phoneId})
        await trialToken.save()
    }else {
        trialToken.auth = cryptRandomString
        await trialToken.save()
    }
    const token = jwt.sign({_id:trialToken._id ,auth:random}, process.env.TRIAL_TOKEN, {expiresIn:'7 days'}) 
    return token
}

function expireAt(day) { 
    const today = new Date()
    const expiry = new Date(today)
    return expiry.setDate(today.getDate() + day)
}

/**
 * if email
 *      1- check if there is user linked to this email
 *      2- if user 
 *          1- generate token with user id and JWT_TOKEN secret
 *          2- send this token
 *      3- if not user
 *          1- generate trial token
 *          2- send it with message declare this email is wrong and not linked to any account
 * if not email
 *      1- generate trial token
 *      2- send to client
 * 
 */