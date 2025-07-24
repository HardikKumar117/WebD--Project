import express from 'express'
import dotenv from 'dotenv'
import { logger } from './src/logger.js'
import {app} from './src/app.js'
import { createDbConnection } from './src/db/connection.js'
dotenv.config()



app.listen(process.env.PORT,()=>{
logger.info(`Server is running on port ${process.env.PORT}`)
})
createDbConnection()