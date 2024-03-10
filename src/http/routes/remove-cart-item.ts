import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const removeCartItem = new Elysia().use(auth).delete(
  '/cart/:productId',
  async ({ getCurrentUser, params }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params

    await db
      .delete(carts)
      .where(and(eq(carts.productId, productId), eq(carts.userId, sub)))
  },
  {
    params: t.Object({ productId: t.String() }),
  },
)
