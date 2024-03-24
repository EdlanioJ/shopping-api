import { Elysia, t } from 'elysia'
import { count, eq } from 'drizzle-orm'

import { auth } from '../auth'
import { db } from '@/db/connection'
import { products, favorites } from '@/db/schema'

export const getFavorites = new Elysia().use(auth).get(
  '/',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()

    const pageIndex = query.pageIndex ?? 0
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
      totalCount: countProducts.count ?? 0,
    }
  },
  {
    query: t.Object({
      pageIndex: t.Optional(t.Numeric({ minimum: 0 })),
    }),
    response: {
      200: t.Object({
        products: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            image: t.String(),
            priceInCents: t.Number(),
          }),
        ),
        pageIndex: t.Number(),
        perPage: t.Number(),
        totalCount: t.Number(),
      }),
    },
  },
)
