import mongoose from 'mongoose'

const sequenceSchema = new mongoose.Schema({
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