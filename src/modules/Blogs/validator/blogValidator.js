import joi from 'joi'

export const validatedBlog=joi.object({
    title:joi.string().required(),
    content:joi.string().required()
    
})