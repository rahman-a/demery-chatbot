import Writer from '../models/writerModel.js'
import User from '../models/userModel.js'
import Trial from '../models/trialModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const isAuth = async(req, res, next) => {
    try {
        if(req.cookies['tk.id']){
            const token =  req.cookies['tk.id'] 
            const decode = jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
                if(err) throw new Error('please login first')
                return decode
            })

            const writer = await Writer.findOne({_id:decode._id}) 
            if(!writer) {
                res.status(401)
                throw new Error('please login first')
            }
            req.writer = writer 
            req.token = token 
            next()
        }else {
            res.status(401)
            throw new Error('please login first')
        }
    } catch (error) {
        next(error)
    }
    
}

export const isUserAuth = async(req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.replace('Bearer ', '')
            let decode = jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
                if(err){
                    decode = jwt.verify(token, process.env.TRIAL_TOKEN, (err, decode) => {
                        if(err) throw new Error('please login first 1')
                        return decode
                    })
                }
                return decode
            })
            if(!(decode.auth)) {
                const user = await User.findOne({_id:decode._id, token:token})
                if(!user) {
                    res.status(401)
                    throw new Error('please login first 2')
                }
                req.user = user
                req.token = token 
                next()
            }else {
                const trialToken = await Trial.findById({_id:decode._id})
                if(!trialToken) {
                    res.status(401)
                    throw new Error('Not Authorized')
                }
                const isMatch = await bcrypt.compare(decode.auth, trialToken.auth)
                if(!isMatch) {
                    res.status(401)
                    throw new Error('Not Authorized')
                }
                req.token = trialToken.token
                req.isTrial = true
                next()
            }
            
        }else {
            res.status(401)
            throw new Error('please login first')
        }
    } catch (error) {
        next(error)
    }
    
}

export const isAdmin = (req, res, next) => {
    try {
        if(!req.writer.isAdmin) {
            res.status(401) 
            throw new Error(`You're not authorized to handle that request`)
        }else {
            next()
        }
    } catch (error) {
        next(error)
    }
    
}

export const checkDashApiKey = (req, res, next) => {
    if(req.headers.apikey){
        try {
            if(req.headers.apikey === process.env.DASHAPIKEY) next()
            else {
                res.status(401)
                throw new Error('Please Provide A valid Api Key')
            }
        } catch (error) {
            next(error)
        }
    }else  {
        res.status(401)
        next(new Error('NOT Authorized to Access the API'))
    }
}

export const checkUserApiKey = (req, res, next) => {
    if(req.headers.apikey){
        try {
            if(req.headers.apikey === process.env.USERAPIKEY) next()
            else {
                res.status(401)
                throw new Error('Please Provide A valid Api Key')
            }
        } catch (error) {
            next(error)
        }
    }else  {
        res.status(401)
        next(new Error('NOT Authorized to Access the API'))
    }
}