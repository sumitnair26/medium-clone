import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
//import { sign } from 'hono/jwt'
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@sumitnair26/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables: {
        userId:string
    }
}>();

blogRouter.use("/*",async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id);
        await next();
    }else {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.get('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  
  blogRouter.post('/', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(411)
            return c.json({
                message: "Input validation failed"
            })
        }
        const authorId = c.get("userId");
        try {
           const blog = await prisma.post.create({
                data: {
                    title:body.title,
                    content: body.content,
                    authorId: authorId
                }
            })
            return c.json({
                id: blog.id
            })
        } catch (error) {
            c.status(409);
            return c.text('Something went wrong !!')
        }
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message: "Input validation failed"
        })
    }
    try {
       const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title:body.title,
                content: body.content,
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (error) {
        return c.text('Something went wrong !!')
    }
  })

  blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        select: {
            content:true,
            title: true,
            id: true,
            author:{
                select: {
                    name: true
                }
            }
        }
    }
    );
    return c.json({
        blogs
    })
  })
  
  blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
   //const body = await c.req.json();
    try {
       const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                title:true,
                content: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        c.status(411);
        return c.text('Error while fetching blog post !!')
    }
  })