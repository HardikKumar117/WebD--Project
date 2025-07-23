import { z } from "zod"

export const blogSchema=z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().min(50, "Content should be atleast 50 chatcters"),
    tags: z.string().min(2, "please add atleast one tag")
})

export type BlogSchema=z.infer<typeof blogSchema> /*probably should put this in types, but will leave it here for now */

export const authSchema=(type: "sign-in" | "register") => z.object({
    username: type==="sign-in"? z.string().min(5, "username should be atleast 5 characters"): z.string().optional(),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "The password should be atleast 8 characters")
})