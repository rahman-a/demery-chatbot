import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,   
    },
    image: {
        type:String
    }
}, {
    timestamps:true
})


const Channel = new mongoose.model('Channel', channelSchema)

export default Channel