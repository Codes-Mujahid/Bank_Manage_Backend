import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'

dotenv.config()
await connectDB()
const app= express()

//frontend-origins
const allowedOrigins= ['http://localhost:5173']


// middlewares
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.use('/api/user', userRouter)

app.get('/', (req, res)=> {
    res.json({
        success: true,
        message: 'server runnng!'
    })
})

// test server
const PORT= process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`server running on http://localhost:${PORT}`);
})
