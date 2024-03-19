import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'

export const getProfile = new Elysia().use(auth).get(
  '/profile',
  async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => eq(fields.id, sub),
      columns: {
        id: true,
        name: true,
        imageUrl: true,
        email: true,
      },
    })

    if (!user) throw new Error('User not found')

    return user
  },
  {
    response: {
      200: t.Object({
        id: t.String(),
        name: t.String(),
        imageUrl: t.Nullable(t.String()),
        email: t.String(),
      }),
    },
  },
)
