import express from 'express'
import connectDB from './config/db.config'
import cors from 'cors'
import errorHandler from './middleware/error.middleare'
const app = express()


import adminRoute from './routes/admin.route'
import surveyRoute from './routes/survey.route'



app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors({
    origin:'http://localhost:5173'
}))

connectDB()

app.use('/api/survey',surveyRoute)
app.use('/api/admin',adminRoute)

app.use(errorHandler)


app.listen(3000,()=>console.log('server listening on http://localhost:3000'))