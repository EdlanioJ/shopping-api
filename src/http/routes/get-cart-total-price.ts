import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts, products } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export const getCartTotalPrice = new Elysia().use(auth).get(
  '/cart/price',
  async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()
    const sq = db
      .select()
      .from(carts)
      .innerJoin(products, eq(products.id, carts.productId))
      .where(eq(carts.userId, sub))

    const [totalCartItems] = await db
      .select({
        totalInCents:
          sql`sum(${products.priceInCents} * ${carts.quantity})`.mapWith(
            Number,
          ),
      })
      .from(sq.as('sql'))

    return {
      totalInCents: totalCartItems.totalInCents,
    }
  },
  {
    response: { 200: t.Object({ totalInCents: t.Nullable(t.Number()) }) },
  },
)
