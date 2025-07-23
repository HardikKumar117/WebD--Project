import jwt from 'jsonwebtokens'
import { logger } from '../logger.js'

export const generateToken=(userId)=>{
    try{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"2h"})
    return token}
    catch(err){logger.error("error in token genration")}
}