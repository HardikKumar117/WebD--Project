import { User } from "../../../db/schemas/User.js";
import { logger } from "../../../logger.js";
import { validatedUser } from "../validator/auth-validator.js";
import {v4 as uuidv4} from 'uuid'
import { hashPassword } from "../../../utils/hash-password.js";



export const register=async(req,res)=>{
    const body=req.body;
    
    
    const {value:validatedData,error}=validatedUser.validate(body);
    if(error){
        logger.error("Error in validation",error);
    }
   

    const hashedPassword=hashPassword(validatedData.password)
     const isExisting=await User.findOne({username:validatedData.name})
     if(isExisting){
        logger.info("Username already taken")
     }
     const isEmailExisting=await User.findOne({email:validatedData.email})
     if(isEmailExisting){
        logger.info("user already exists")
     }
    const userId=uuidv4();
    const user=new User({
        user_id:userId,
        username:validatedData.name,
        email:validatedData.email,
        password:hashedPassword,
        // phone:validatedData.phone,       
    })
    await user.save();
    logger.info(`User is registered${user}`)

}

export const login=(req,res)=>{

}