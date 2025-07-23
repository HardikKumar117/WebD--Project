import mongoose from "mongoose";
import { BlogSchema } from "./Blogs.js";

const UserSchema=new mongoose.Schema({
    user_id:String,
    username:String,
    password:String,
    email:String,
    blogs:{
        type:[BlogSchema],
          default:[]
    }
})
export const User=new mongoose.model("users",UserSchema)