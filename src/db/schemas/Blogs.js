import mongoose from "mongoose";

export const BlogSchema=new mongoose.Schema({
    user_id:String,
    blog_id:String,
    blog_title:String,
    blog_content:String,
    likes:{
        type:String,
        default:"0",
    },
    comments:{
        type:Array,
          default:[]
    }
})
export const Blog=new mongoose.model("blogs",BlogSchema)