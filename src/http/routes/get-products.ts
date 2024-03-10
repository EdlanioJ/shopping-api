import { Elysia, t } from 'elysia'
import { eq, or, count } from 'drizzle-orm'

import { auth } from '../auth'
import { db } from '../../db/connection'
import { categories, productCategories, products } from '../../db/schema'

export const getProducts = new Elysia().use(auth).get(
  '/products',
  async ({ getCurrentUser, query }) => {
    await getCurrentUser()

    const { pageIndex, category } = query
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
      totalCount: countProducts.count,
    }
  },
  {
    query: t.Object({
      category: t.String({ default: 'popular' }),
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
