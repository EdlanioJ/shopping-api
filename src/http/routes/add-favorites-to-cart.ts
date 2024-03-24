import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts, favorites } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const addFavoritesToCart = new Elysia().use(auth).post(
  '/cart',
  async ({ getCurrentUser, set }) => {
    const { sub } = await getCurrentUser()

    const favoriteItems = await db.query.favorites.findMany({
      where: (fields, { eq }) => eq(fields.userId, sub),
      columns: { productId: true },
    })

    if (favoriteItems.length === 0) throw new Error('Empty favourite list')

    await db
      .insert(carts)
      .values(
        favoriteItems.map((item) => ({
          productId: item.productId,
          userId: sub,
          quantity: 1,
        })),
      )
      .onConflictDoNothing({ target: [carts.productId, carts.userId] })

    await db.delete(favorites).where(eq(favorites.userId, sub))

    set.status = 'No Content'
  },
  {
    response: {
      204: t.Void(),
    },
  },
)
