import express from 'express'
import { authRouter } from './modules/auth/routes/route.js'
import { blogRouter } from './modules/Blogs/routes/route.js'

export const app=express()
app.use(express.json())
app.use("/auth",authRouter)
app.use("/home",blogRouter)