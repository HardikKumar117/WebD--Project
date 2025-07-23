import {logger} from '../logger.js'
import mongoose from 'mongoose'

export const createDbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("Connection created successfully")

    }
    catch(err){logger.error("error in db connection",err)}
}