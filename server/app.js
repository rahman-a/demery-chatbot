import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectDB from './src/dbConnection.js'
import mongoose from 'mongoose'
import chalk from 'chalk'
import {notFound, errorHandler} from './src/middleware/errorHandler.js'
import writerRouter from './src/routers/writerRouter.js' 
import channelRouter from './src/routers/channelRouter.js'
import dialogueRouter from './src/routers/dialogueRouter.js'
import blockRouter from './src/routers/blockRouter.js'
import timedRouter from './src/routers/timedRouter.js'
import userRouter from './src/routers/userRouter.js'
import sequenceRouter from './src/routers/sequenceRouter.js'
import {checkUserApiKey, checkDashApiKey} from './src/middleware/auth.js'
import {fileURLToPath} from 'url'
import path from 'path' 

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 

const app = express()
dotenv.config()
connectDB()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())
app.use('/api/writers', checkDashApiKey,writerRouter)
app.use('/api/channels', checkDashApiKey,channelRouter)
app.use('/api/blocks', checkDashApiKey,blockRouter)
app.use('/api/dialogues', checkDashApiKey,dialogueRouter)
app.use('/api/timed', checkDashApiKey,timedRouter)
app.use('/api/sequence', checkDashApiKey, sequenceRouter)
app.use('/api/users',checkUserApiKey, userRouter)
app.use('/api/uploads', express.static(path.resolve(__dirname, './uploads')))
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

mongoose.connection.once('open', () => {
    
    app.listen(port, () => {
        console.log(chalk.black.bold.bgGreenBright(`server is up and running at port ${port}`));
    })
})
