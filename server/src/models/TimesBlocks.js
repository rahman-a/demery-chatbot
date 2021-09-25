import mongoose from 'mongoose'

const timedBlockSchema = new mongoose.Schema({
    channel: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Channel'
    },
    block: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Block'
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        required:true
    }
})

const TimedBlock = mongoose.model('TimedBlock', timedBlockSchema)

export default TimedBlock