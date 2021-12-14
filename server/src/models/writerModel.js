import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const writerSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        lowerCase:true,
        required:true,
        match:/^[_a-zA-Z0-9]+$/
    },
    email: {
        type:String,
        unique:true,
        lowerCase:true,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    fullName: {
        type:String,
        match:/^[a-zA-Zء-ي ]+$/
    },
    phone: {
        type:String
    },
    image:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    channels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }]
},{
    timestamps:true
})


writerSchema.methods.toJSON = function(){
    const writer = this.toObject()
    delete writer.password 
    delete writer.token
    if(!writer.isAdmin) delete writer.isAdmin
    return writer
}

writerSchema.statics.findByCredential = async (info, password, res) => {
    let writer = await Writer.findOne({userName:info})
    if(!writer) {
        writer = await Writer.findOne({email:info})
        if(!writer) {
            res.status(401)
            throw new Error('No Account Found with that information, Please try again')
        }
    }
    const isMatch = await bcrypt.compare(password, writer.password)
    if(!isMatch) {
        res.status(401)
        throw new Error('No Account Found with that information, Please try again')
    }

    if(!writer.isActive) {
        res.status(401)
        throw new Error(`You can't access the account right now, please contact the administration`)
    }
    
    return writer
}

writerSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id.toString()},process.env.JWT_TOKEN,{expiresIn:'1 days'})
    return token
}

writerSchema.methods.subscribe = async function(channelId){
    if(!(this.channels.includes(channelId))){
        this.channels = this.channels.concat(channelId)
        await this.save()
    }
}

writerSchema.methods.unsubscribe = async function(channelId){
    this.channels = this.channels.filter(channel => channel._id !== channelId )
    await this.save()
}


writerSchema.methods.toAuthJSON = function() {
    const data = {
        _id:this._id,
        userName:this.userName,
        fullName:this.fullName,
        image:this.image,
        email:this.email,
        phone:this.phone,
        gender:this.gender,
    }
    if(this.isAdmin) data.isAdmin = true
    return data
}

writerSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

const Writer = mongoose.model('Writer', writerSchema)


export default Writer 