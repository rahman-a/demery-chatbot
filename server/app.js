import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send({
        message:'Server is Running',
        state:"active"
    })
})

app.listen(5000, () => {
    console.log('server is up and running at port 5000');
})