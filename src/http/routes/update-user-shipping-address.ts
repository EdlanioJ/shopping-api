import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateUserShippingAddress = new Elysia().use(auth).put(
  '/shipping/:addressId',
  async ({ getCurrentUser, params, set }) => {
    const { sub } = await getCurrentUser()
    const { addressId } = params

    await db
      .update(users)
      .set({ shippingAddress: addressId })
      .where(eq(users.id, sub))

    set.status = 'No Content'
  },
  {
    params: t.Object({ addressId: t.String({ minLength: 1 }) }),
    response: { 204: t.Void() },
  },
)
