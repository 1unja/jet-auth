import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import { authRouter } from "./authRouters/auth-router"
import errorMiddleware from "./middlewares/error-middleware"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', authRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        if (process.env.DB_URL) {
            await mongoose.connect(process.env.DB_URL)
        }
        app.listen(port, () => console.log('server started on port ', port))
    } catch(e) {
        console.log(e)
    }
}

start()