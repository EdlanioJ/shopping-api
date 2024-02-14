import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { login } from './routes/login'
import { register } from './routes/register'

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')
        if (!origin) return false
        return true
      },
    }),
  )
  .use(login)
  .use(register)

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
