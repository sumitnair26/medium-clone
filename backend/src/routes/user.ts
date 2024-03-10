import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import z from "zod";

const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

// Create the main Hono app
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message: "Input validation failed"
        })
    }
    try {
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password
        }
      })
     //@ts-ignore
      const token = await sign({id: user.id},c.env.JWT_SECRET); 
      c.status(403);
      return c.json({
        jwt:token
      })
    } catch (error) {
      return c.json({ error: "error while signing up" });
    }
  });
  
  userRouter.post('/signin', async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
          where: {
              email: body.email
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt, user });
  })
  