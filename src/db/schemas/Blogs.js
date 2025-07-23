import mongoose from "mongoose";

const BlogSchema=new mongoose.Schema({
    user_id:String,
    blog_id:String,
    blog_title:String,
    blog_content:String,
    likes:String,
    comments:{
        type:Array,
          default:[]
    }
})
export const Blog=new mongoose.model("blogs",BlogSchema)