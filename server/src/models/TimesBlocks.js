import mongoose from 'mongoose'

const timedBlockSchema = new mongoose.Schema({
    channel: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Channel'
    },
    group : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sequence',
        default:null
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
    day: {
        type:String,
        default:null
    },
    date:{
        type:Date,
        default:null
    },
    ids:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
}, {
    timestamps:true
})

const TimedBlock = mongoose.model('TimedBlock', timedBlockSchema)

export default TimedBlock