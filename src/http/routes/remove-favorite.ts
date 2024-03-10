import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { favorites } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const removeFavorite = new Elysia().use(auth).delete(
  '/favorites/:productId',
  async ({ getCurrentUser, params }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params
    console.log(productId)

    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, sub), eq(favorites.productId, productId)))
  },
  {
    params: t.Object({
      productId: t.String(),
    }),
  },
)
