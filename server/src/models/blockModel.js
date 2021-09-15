import mongoose  from "mongoose";

const buttonSchema = new mongoose.Schema({
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        }, 
        type:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        action:{
            type:String
        }
})

const blockSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Writer'
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Channel'
    },
    type:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    image:{
        type:String
    },
    buttons:[buttonSchema]

}, {
    timestamps:true
})

const Block = new mongoose.model('Block', blockSchema)

export default Block