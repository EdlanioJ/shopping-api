import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'
import { hashPassword } from '../../utils/bcrypt'
import { users } from '../../db/schema'
import { stripe } from '@/libs/stripe'

export const register = new Elysia().use(auth).post(
  '/register',
  async ({ body, set }) => {
    const { email, name, password } = body
    const hashedPassword = await hashPassword(password)
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    })

    await stripe.customers.create({
      email,
      name,
    })
    set.status = 204
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 8 }),
    }),
  },
)
