import { Elysia, t } from 'elysia'
import { createSelectSchema } from 'drizzle-typebox'

import { auth } from '@/http/auth'
import { orderItems, orders, users } from '@/db/schema'
import { db } from '@/db/connection'
import { and, count, eq, sql } from 'drizzle-orm'

export const getOrders = new Elysia().use(auth).get(
  '/orders',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()
    const { status, pageIndex } = query

    const sq = db
      .select({
        id: orders.id,
        status: orders.status,
        totalInCents: orders.totalInCents,
        createdAt: orders.createdAt,
        quantity: sql<number>`cast(count(${orderItems.id}) as int)`,
      })
      .from(orders)
      .innerJoin(users, eq(users.id, orders.userId))
      .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
      .where(and(eq(users.id, sub), eq(orders.status, status)))
      .groupBy(orders.id)

    const [ordersCount] = await db.select({ count: count() }).from(sq.as('sq'))
    const allOrders = await sq.limit(10).offset(pageIndex * 10)
    return {
      orders: allOrders,
      pageIndex,
      perPage: 10,
      totalCount: ordersCount.count,
    }
  },
  {
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
      status: createSelectSchema(orders).properties.status,
    }),
    response: {
      200: t.Object({
        orders: t.Array(
          t.Object({
            id: t.String(),
            status: createSelectSchema(orders).properties.status,
            totalInCents: t.Number({ default: 0 }),
            createdAt: t.Nullable(t.Date()),
            quantity: t.Number({ default: 0 }),
          }),
        ),

        pageIndex: t.Number({ default: 0 }),
        perPage: t.Number({ default: 10 }),
        totalCount: t.Number({ default: 0 }),
      }),
    },
  },
)
