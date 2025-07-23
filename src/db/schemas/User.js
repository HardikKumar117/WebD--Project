import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    user_id:String,
    username:String,
    password:String,
    email:String,
    blogs:{
        type:Array,
          default:[]
    }
})
export const User=new mongoose.model("users",UserSchema)