import mongoose from 'mongoose'

// This schema is temporary until gallery collection created to use multiple refs
// on response field
const dialogueSchema  = new mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Writer'
    },
    request:{
        type:String
    },
    
    response:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Block'
    }
}, {
    timestamps:true
})

const Dialogue = new mongoose.model('Dialogue', dialogueSchema)

export default Dialogue

// const dialogueSchema  = new mongoose.Schema({
//     channel:{
//         _id:mongoose.Schema.Types.ObjectId,
//         ref:'Channel'
//     },
//     user:{
//         _id:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },
//     request:{
//         type:String
//     },
    
//     response:{
//         _id:mongoose.Schema.Types.ObjectId,
//         refPath:'OnModel'
//     }, 
//     onModel:{
//         type: String,
//         required: true,
//         enum: ['Block', 'Gallery'] // Gallery Collection NOT created yet
//     }
//     // http://mongoosejs.com/docs/populate.html#dynamic-ref
//     // look up for multiple refs
// }, {
//     timestamps:true
// })