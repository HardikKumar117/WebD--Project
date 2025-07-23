import bcrypt from 'bcrypt'
import { logger } from '../logger.js';

export const hashPassword=(rawPassword)=>
{try{
    const hashedPassword=bcrypt.hashSync(rawPassword,10);
return hashedPassword}
catch(err){logger.error("error in password")}}

export const comparePassword=(rawPassword,hashedPassword)=>{
    return bcrypt.compareSync(rawPassword,hashedPassword)
}