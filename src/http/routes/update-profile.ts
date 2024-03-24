import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateProfile = new Elysia().use(auth).patch(
  '/',
  async ({ body, getCurrentUser, set }) => {
    const { sub } = await getCurrentUser()
    const { email, imageUrl, name } = body
    await db
      .update(users)
      .set({
        email,
        imageUrl,
        name,
      })
      .where(eq(users.id, sub))

    set.status = 'No Content'
  },
  {
    body: t.Partial(
      t.Object({
        name: t.String(),
        email: t.String(),
        imageUrl: t.String(),
      }),
    ),
    response: { 204: t.Void() },
  },
)
