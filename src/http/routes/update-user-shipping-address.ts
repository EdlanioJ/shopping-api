import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateUserShippingAddress = new Elysia().use(auth).put(
  '/user/shipping/:addressId',
  async ({ getCurrentUser, params }) => {
    const { sub } = await getCurrentUser()
    const { addressId } = params

    await db
      .update(users)
      .set({ shippingAddress: addressId })
      .where(eq(users.id, sub))
  },
  {
    params: t.Object({ addressId: t.String({ minLength: 1 }) }),
  },
)