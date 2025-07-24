import jwt from 'jsonwebtoken'
import { logger } from '../logger.js'

export const generateToken=(userId)=>{
    try{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"2h"})
    return token}
    catch(err){logger.error("error in token genration")}
}
export const verifyToken=(token)=>{
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    return decoded;}
    catch(err){throw new Error("Error in token verification")}
}