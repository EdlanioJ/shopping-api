import { Elysia, t } from 'elysia'
import { count, eq } from 'drizzle-orm'

import { auth } from '../auth'
import { db } from '@/db/connection'
import { products, favorites } from '@/db/schema'

export const getFavorites = new Elysia().use(auth).get(
  '/favorites',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()

    const { pageIndex } = query
    const sql = db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        priceInCents: products.priceInCents,
      })
      .from(favorites)
      .innerJoin(products, eq(products.id, favorites.productId))
      .where(eq(favorites.userId, sub))

    const [countProducts] = await db
      .select({ count: count() })
      .from(sql.as('sql'))

    const allProducts = await sql.limit(10).offset(pageIndex * 10)

    return {
      products: allProducts,
      pageIndex,
      perPage: 10,
      totalCount: countProducts.count,
    }
  },
  {
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
