import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        lowerCase:true,
        unique:true,
        trim:true
    },
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowerCase:true,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type:String,
        required:true 
    },
    image :{
        type:String
    },
    channels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }],
    isActive:{
        type:Boolean,
        default:true
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]

}, {
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password 
    delete user.tokens
    return user
}

userSchema.statics.findByCredential = async (info, password, res) => {
    let user = await User.findOne({userName:info})
    if(!user) {
        user = await user.findOne({email:info})
        if(!user) {
            res.status(401)
            throw new Error('No Account Found with that information, Please try again')
        }
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        res.status(401)
        throw new Error('No Account Found with that information, Please try again')
    }

    if(!user.isActive) {
        res.status(401)
        throw new Error(`You can't access the account right now, please contact the administration`)
    }
    
    return user
}

userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id.toString()},process.env.JWT_TOKEN,{expiresIn:'1 days'})
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}


userSchema.methods.toAuthJSON = function() {
    const data = {
        _id:this._id,
        userName:this.userName,
        firstName:this.firstName,
        lastName:this.lastName,
        image:this.image,
        email:this.email,
    }
    return data
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

const User = mongoose.model('User', userSchema)


export default User