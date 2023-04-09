import express from 'express'
import mongoose from "mongoose";
import {PORT, db} from "./utils/consts.js";
import cors from 'cors'
import dotenv from 'dotenv'
import {authRoutes} from "./routes/auth.js";

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)

async function start() {
    try {
        await mongoose.connect(db)
        app.listen(PORT, () => {
            console.log('start', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()