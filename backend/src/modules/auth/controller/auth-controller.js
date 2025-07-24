import { User } from "../../../db/schemas/User.js";
import { logger } from "../../../logger.js";
import { validatedUser } from "../validator/auth-validator.js";
import {v4 as uuidv4} from 'uuid'
import { hashPassword,comparePassword } from "../../../utils/hash-password.js";
import { validatedLogin } from "../validator/login-validator.js";
import { generateToken } from "../../../utils/tokens.js";



export const register=async(req,res)=>{
    const body=req.body;
    
    
    const {value:validatedData,error}=validatedUser.validate(body);
    if(error){
        logger.error("Error in validation",error);
    }
   

    const hashedPassword=hashPassword(validatedData.password)
     const isExisting=await User.findOne({username:validatedData.name})
     if(isExisting){
        res.status(401).json({message:"Username already taken"})
     }
     const isEmailExisting=await User.findOne({email:validatedData.email})
     if(isEmailExisting){
        res.status(401).json({message:"user already exists"})
     }
    const userId=uuidv4();
    const user=new User({
        user_id:userId,
        username:validatedData.name,
        email:validatedData.email,
        password:hashedPassword,
              
    })
    await user.save();
    logger.info(`User is registered${user}`)
    res.status(201),json({message:"You Are Registered"})

}

export const login=async(req,res)=>{
    const body=req.body;
    const {value:validatedData,error}=validatedLogin.validate(body);
    const user=await User.findOne({"email":validatedData.email})
    if(!user){
        res.status(404).json({message:"User not Found!"})
    }
    const isMatched=comparePassword(validatedData.password,user.password)
    if(isMatched){
        const token=generateToken(user.user_id);
        res.status(201).json({message:"Login Successful"})
        logger.info(`Logged user ${user.username} and generated token is ${token}`)
    }
    if(!isMatched){
        res.status(401).json({message:"Invalid Username or Password"})

    }


}