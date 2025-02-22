
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


const uri = process.env.MONGODB_URL || 'mongodb://localhost:27017/survey-app'

const connectDB = async ()=>{
    try {
        await mongoose.connect(uri!)
    } catch (error) {
        console.error('Error founded in connect db',error);
    }
}

export default connectDB