import { Elysia, t } from 'elysia'
import { eq, or, count } from 'drizzle-orm'

import { auth } from '../auth'
import { db } from '../../db/connection'
import { categories, productCategories, products } from '../../db/schema'

export const getProducts = new Elysia().use(auth).get(
  '/',
  async ({ getCurrentUser, query }) => {
    await getCurrentUser()
    const pageIndex = query.pageIndex ?? 0
    const category = query.category

    const sql = db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        priceInCents: products.priceInCents,
      })
      .from(productCategories)
      .innerJoin(products, eq(products.id, productCategories.productId))
      .innerJoin(categories, eq(categories.id, productCategories.categoryId))
      .where(or(eq(categories.slug, category), eq(categories.id, category)))

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
      category: t.String({ default: 'popular' }),
      pageIndex: t.Optional(t.Numeric({ minimum: 0 })),
    }),
    response: {
      200: t.Object({
        products: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            image: t.String(),
            priceInCents: t.Number({ default: 0 }),
          }),
        ),
        pageIndex: t.Number(),
        perPage: t.Number(),
        totalCount: t.Number(),
      }),
    },
  },
)
