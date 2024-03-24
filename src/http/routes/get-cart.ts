import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts, products } from '@/db/schema'
import { count, eq, sql } from 'drizzle-orm'

export const getCart = new Elysia().use(auth).get(
  '/',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()
    const pageIndex = query.pageIndex ?? 0

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
      totalInCents: totalCartItems.totalInCents ?? 0,
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
            stock: t.Number(),
            quantity: t.Number(),
            priceInCents: t.Number(),
          }),
        ),
        totalInCents: t.Number(),
        pageIndex: t.Number(),
        perPage: t.Number(),
        totalCount: t.Number(),
      }),
    },
  },
)
