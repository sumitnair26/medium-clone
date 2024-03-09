import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const body = await c.req.json();

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password
    }
  })
 //@ts-ignore
  const token = await sign({id: user.id},c.env.JWT_SECRET);

  return c.json({
    jwt:token
  })
});

// app.post('/api/v1/signup', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	try {
// 		const user = await prisma.user.create({
// 			data: {
// 				email: body.email,
// 				password: body.password
// 			}
// 		});
// 		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 		return c.json({ jwt });
// 	} catch(e) {
// 		c.status(403);
// 		return c.json({ error: "error while signing up" });
// 	}
// })

app.post('/api/v1/signin', async (c) => {
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

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono! blog')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono! blog')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono! id')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono! bulk')
})


export default app
