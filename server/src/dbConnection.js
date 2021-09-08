import mongoose from 'mongoose'
import chalk from 'chalk'


const connectDB = async _ => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        console.log(chalk.cyan.underline(`Mongodb Connected: ${conn.connection.host}`));
    } catch (error) {
        console.log(chalk.red.bold(`ERROR: ${error.message}`));
        process.exit(1)
    }
}

export default connectDB