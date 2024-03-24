import { Elysia, t } from 'elysia'
import { eq, sql } from 'drizzle-orm'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { orders } from '@/db/schema'

export const getOrderCount = new Elysia().use(auth).get(
  '/count',
  async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()

    const [order] = await db
      .select({
        count: sql`count(${orders.id})`.mapWith(Number),
      })
      .from(orders)
      .where(eq(orders.userId, sub))
      .groupBy(orders.userId)

    return { count: order?.count ?? 0 }
  },
  {
    response: {
      200: t.Object({
        count: t.Number(),
      }),
    },
  },
)
