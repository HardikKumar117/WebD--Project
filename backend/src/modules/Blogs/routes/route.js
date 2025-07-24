import {Router} from 'express'
import { authMiddleware } from '../../auth/controller/middlewares/auth-middleware.js'
import { getAllBlogs,getBlogById,createBlog } from '../controller/blog-controller.js'

export const blogRouter =Router()
blogRouter.get("/",getAllBlogs)
blogRouter.get("/:id",getBlogById)
blogRouter.post("/create",authMiddleware,createBlog)
