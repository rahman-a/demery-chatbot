import mongoose from 'mongoose'

const trialSchema = new mongoose.Schema({
    auth:{
        type:String,
        required:true
    },
    phoneId: {
        type:String
    },
    isValid:{
        type:Boolean,
        default:true
    }
}, {timestamps:true})

export default mongoose.model('Trial', trialSchema)