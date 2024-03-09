import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', (c) => {
  return c.text('Hello Hono post! signup')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono! signin')
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
