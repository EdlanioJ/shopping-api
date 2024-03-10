import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const updateCartItem = new Elysia().use(auth).put(
  '/cart/:productId',
  async ({ getCurrentUser, params, body }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params
    const { quantity } = body

    await db
      .update(carts)
      .set({ quantity, updatedAt: new Date() })
      .where(and(eq(carts.productId, productId), eq(carts.userId, sub)))
  },
  {
    params: t.Object({ productId: t.String() }),
    body: t.Object({ quantity: t.Number() }),
  },
)
