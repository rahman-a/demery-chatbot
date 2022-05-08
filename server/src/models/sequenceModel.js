import mongoose from 'mongoose'

const sequenceSchema = new mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    title: {
        type:String,
        required:true,
    },
    content: {
        type:String,
    },
    days: [{
        type:String,
        required:true
    }],
}, {
    timestamps:true
})

const Sequence = mongoose.model('Sequence', sequenceSchema)

export default Sequence