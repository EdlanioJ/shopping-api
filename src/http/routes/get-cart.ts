import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts, products } from '@/db/schema'
import { count, eq, sql } from 'drizzle-orm'

export const getCart = new Elysia().use(auth).get(
  '/cart',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()
    const { pageIndex } = query

    const sq = db
      .select({
        name: products.name,
        id: products.id,
        image: products.image,
        priceInCents: products.priceInCents,
        stock: products.stock,
        quantity: carts.quantity,
      })
      .from(carts)
      .innerJoin(products, eq(products.id, carts.productId))
      .where(eq(carts.userId, sub))

    const [countProducts] = await db
      .select({ count: count() })
      .from(sq.as('sql'))

    const [totalCartItems] = await db
      .select({
        totalInCents:
          sql`sum(${products.priceInCents} * ${carts.quantity})`.mapWith(
            Number,
          ),
      })
      .from(sq.as('sql'))
    const allProducts = await sq.limit(10).offset(pageIndex * 10)

    return {
      products: allProducts,
      totalInCents: totalCartItems.totalInCents,
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
