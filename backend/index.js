import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import adminRoute from './routes/admin.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = [
    'http://localhost:5173',
    'https://job-portal-kappa-coral.vercel.app',
    process.env.FRONTEND_URL
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected ✅'))
    .catch((err) => console.log('MongoDB error:', err))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)
app.use('/api/v1/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('Job Portal API running 🚀')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})