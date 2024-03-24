import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { addresses } from '@/db/schema'

export const addAdress = new Elysia().use(auth).post(
  '/',
  async ({ getCurrentUser, body, set }) => {
    const { sub } = await getCurrentUser()
    await db.insert(addresses).values({
      owner: sub,
      city: body.city,
      name: body.name,
      state: body.state,
      street: body.street,
      zipCode: body.zipCode,
      country: body.country,
    })

    set.status = 'No Content'
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      street: t.String({ minLength: 1 }),
      city: t.String({ minLength: 1 }),
      state: t.String({ minLength: 1 }),
      country: t.String({ minLength: 1 }),
      zipCode: t.String({ minLength: 1 }),
    }),

    response: {
      204: t.Void(),
    },
  },
)
