import z from "zod";

const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id:z.string()
})

//type inference in zod 

export type SingupInput = z.infer<typeof signupInput>
export type SinginInput = z.infer<typeof signinInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>



