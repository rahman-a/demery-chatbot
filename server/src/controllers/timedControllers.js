import TimedBlock from "../models/TimesBlocks.js";
import Block from '../models/blockModel.js'
import Dialogue from "../models/dialogueModel.js";
import User from "../models/userModel.js"
import Sequence from "../models/sequenceModel.js"
import adminFB from '../../firebase/config.js'
import cron from "node-schedule";

export const createTimed = async (req, res, next) => {
    const newTimedBlock = new TimedBlock(req.body)
    try {
        const timedBlock = await newTimedBlock.save()
        const block = await Block.findById(timedBlock.block)
        if(timedBlock.type === 'instant') {
            const userData = await extractUsersIds()
            userData.forEach(user => {
                if(isUsersSubscribedToChannel(user.channels, timedBlock.channel)) {
                    sendMessageToUserDialogue(timedBlock._id, user, timedBlock.channel)
                    sendNotificationToUserDevice(block, user.notificationToken)
                }
            })
            const user = req.writer?._id
            sendMessageToUserDialogue(timedBlock._id, user, timedBlock.channel)
        } else if(timedBlock.type === 'schedule') {
            cron.scheduleJob(timedBlock.date, async () => {
                const userData = await extractUsersIds()
                userData.forEach(user => {
                if(isUsersSubscribedToChannel(user.channels, timedBlock.channel)) {
                    sendMessageToUserDialogue(timedBlock._id, user, timedBlock.channel)
                    sendNotificationToUserDevice(block, user.notificationToken)
                }
                })
                const user = req.writer?._id
                sendMessageToUserDialogue(timedBlock._id, user, timedBlock.channel)
            })
        }
        if(timedBlock.type === 'sequence'){
            res.status(201).send({
                block : {
                    ...block._doc,
                    group:timedBlock.group,
                    day: timedBlock.day,
                    messageType:timedBlock.type,
                    isActive:timedBlock.isActive,
                    timedCreated:timedBlock.createdAt
                }
            })
        } else {
            res.status(201).send({block:
                {...block._doc, 
                date:timedBlock.date,
                messageType:timedBlock.type,
                sent:!(timedBlock.isActive)}
            })
        }
    } catch (error) {
        next(error)
    }
}

export const listTimedBlocks = async(req, res,next) => {
    const {channel} = req.params 
    const {type, group} = req.query
    try {
        const timedBlocks = await TimedBlock.find({channel, type, group})
        if(!timedBlocks || timedBlocks.length === 0) {
            res.status(404)
            throw new Error('No Blocks Found')
        }
        const blocks = await Promise.all(timedBlocks.map(async block => {
            const getBlock = await Block.findById(block.block)
            if(block.type === 'sequence'){
                return {...getBlock._doc, 
                    day:block.day, 
                    group:block.group, 
                    messageType:block.type,
                    isActive: block.isActive,
                    timedCreated:block.createdAt
                }
            } else {
                return {...getBlock._doc, date:block.date, sent:!(block.isActive), messageType:block.type}
            }
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
                response:timedBlock.block
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

export const toggleActivation = async(req, res, next) => {
    const {id} = req.params
    const {group} = req.query
    try {
        const block = await TimedBlock.findOne({block:id, group, type:'sequence'})
        if(!block){
            res.status(404)
            throw new Error('The Block doesn\'t exist')
        }
        const message = block.isActive 
        ? 'The Message has been Deactivated'
        : 'The Message has been Activated'
        block.isActive = !block.isActive
        await block.save()
        res.send({blockId:id})
    } catch (error) {
        next(error)   
    }
}

export const deleteTimedBlock = async(req, res, next) => {
    const {id} = req.params
    const {type, group} = req.query
    try {
        const block = await TimedBlock.findOne({block:id, type, group})
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

// Run Daily to send Sequence message
cron.scheduleJob('0 6 * * *', async () => {
    const today = getToday()
    const timedBlocks = await TimedBlock.find({type:'sequence', day:today})
    const user_data = await extractUsersIds()
    timedBlocks.forEach(async timedBlock => {
        const block = await Block.findById(timedBlock.block)
        const TimedBlocksWithSameGroupId = await TimedBlock.find({group: timedBlock.group})
        const previousTimedBlocksIds = extractPreviousMessagesIds(TimedBlocksWithSameGroupId, today)
        user_data.forEach( async user => {
            if(!(timedBlock.ids.includes(user._id))) {
                if(isUsersSubscribedToChannel(user.channels, timedBlock.channel) 
                && isUserReceivedPreviousMessages(previousTimedBlocksIds, user._id)) {
                    timedBlock.ids = timedBlock.ids.concat(user._id)
                    await timedBlock.save()
                    sendMessageToUserDialogue(timedBlock._id, user._id, timedBlock.channel)
                    sendNotificationToUserDevice(block, user.notificationToken)
                }
            }
        })
    })

})


// Helper Function
async function sendNotificationToUserDevice (block, token) {
    try {
        const payload = {
            notification: {
                title:block.name,
                content:block.content,
                sound:'default'
            }
        }
        const option = {
            priority:'high'
        }
        await adminFB.messaging().sendToDevice(token, payload, option)
    } catch (error) {
        throw new Error(error)
    }
}

async function extractUsersIds () {
    const users = await User.find({})
    const user_data = []
    users.forEach(user => user_data.push({
        _id:user._id,
        channels: user.channels,
        notificationToken:user.notificationToken
    }))

    return user_data
} 

async function sendMessageToUserDialogue (blockId, user, channel) {
    const block = await TimedBlock.findById(blockId)
    block.isActive = false
    await block.save()
    const newDialogue = new Dialogue({
        channel,
        user,
        response:block
    })
    await newDialogue.save()
}

function extractPreviousMessagesIds (blocks, today) {
    const groupDays = blocks.map(block => block.day)
    const prevDays = findPreviousDays(today, groupDays)
    let blockIds = []
    blocks.forEach(block => {
        if(prevDays.includes(block.day)) {
            blockIds = [...blockIds, ...block.ids]
        }
    })

    return blockIds
}

function isUsersSubscribedToChannel (channels, id) {
    if(channels.includes(id)) {
        return true
    }
    return false
}

function isUserReceivedPreviousMessages(messageIds, userId) {
    if(messageIds.include(userId)) {
        return true
    }
    return false
}

function findPreviousDays(today, groupDays) {
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const indexOfToday = weekDays.indexOf(today)
    const daysData = groupDays.map(day => {
        return {
            name:day,
            index: weekDays.indexOf(day)
        }
    })
    const prevDays = []
    daysData.forEach(day => {
        if(day.index < indexOfToday) prevDays.push(day.name)
    })

    return prevDays
}

function getToday () {
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const date = new Date().getDay()
    return weekDays[date] 
}

