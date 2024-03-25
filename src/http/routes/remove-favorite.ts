import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { favorites } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const removeFavorite = new Elysia().use(auth).delete(
  '/:productId',
  async ({ getCurrentUser, params, set }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params

    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, sub), eq(favorites.productId, productId)))

    set.status = 'No Content'
  },
  {
    params: t.Object({
      productId: t.String(),
    }),
    response: { 204: t.Void() },
  },
)
