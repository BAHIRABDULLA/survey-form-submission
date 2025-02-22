import express from 'express'
import connectDB from './config/db.config'
import cors from 'cors'
import errorHandler from './middleware/error.middleare'
import dotenv from 'dotenv'
dotenv.config()
const app = express()



import adminRoute from './routes/admin.route'
import surveyRoute from './routes/survey.route'


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FRONTEND_URL
}))

connectDB()

app.use('/api/survey',surveyRoute)
app.use('/api/admin',adminRoute)
app.use(errorHandler)


app.listen(3000,()=>console.log('server listening on http://localhost:3000'))