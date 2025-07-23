
import { Blog } from "../../../db/schemas/Blogs.js";
import { validatedBlog } from "../validator/blogValidator.js";
import {v4 as uuidv4} from 'uuid'
import { logger } from "../../../logger.js";
import { User } from "../../../db/schemas/User.js";

export const createBlog=async(req,res)=>{
    try{
        console.log("create blog function")
const userId=req.user.userId;
const body= req.body;
console.log("user_id",userId)
console.log("body",body)
const {value:validatedData,error}=validatedBlog.validate(body);
console.log("validated data",validatedData)
const blogId=uuidv4()
const blog=new Blog({
    user_id:userId,
    blog_id:blogId,
    blog_title:validatedData.title,
    blog_content:validatedData.content,
    
})

console.log(`blog object is ${blog}`)
await blog.save();

const user=await User.findOne({"user_id":userId});
console.log("user",user)
user.blogs.push(blog)
await user.save()
console.log("blog saved")
res.status(201).json({message:"Blog created successfully",blogId:blogId})
logger.info(`blog made by user with userid ${userId} blog:${blog}`)
    }
    catch(err){
        logger.error("Error in blog creation",err)
    }
}

export const getAllBlogs=(req,res)=>{

}
export const getBlogById=async(req,res,id)=>{
    try{
        const blogId=id
        const blog=await Blog.findOne({"blog_id":blogId});
        if(!blog){
            res.status(404).json({message:"Blog not found"})
        }
        console.log("blog to be deleted",blog)
        return blog;

    }catch(err){logger.error("Error in fetching blog",err)}

}

export const deleteBlogById=async(req,res,)=>{
    try{
        const blogId=req.params.id
        const blog=getBlogById(blogId)
        const deletedItem=await Blog.findOneAndDelete({"blog_id":blogId});
        const user=await User.findOne({"user_id":blog.user_id})
        user.blogs=user.blogs.filter((item)=>{item.blog_id!==blogId})
        await user.save()

        if(deletedItem){
            res.status(202).json({message:"blog deleted successfully"})
        }
    }catch(err){logger.error("Error in deletion",err)}

}