import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { orderItems, orders } from '@/db/schema'

export const addOrderItems = new Elysia().use(auth).post(
  '/orders',
  async ({ body, getCurrentUser, set }) => {
    const { sub } = await getCurrentUser()
    const { items } = body

    const productsIds = items.map((item) => item.productId)

    const products = await db.query.products.findMany({
      where: (fields, { inArray }) => inArray(fields.id, productsIds),
      columns: {
        id: true,
        priceInCents: true,
      },
    })

    const totalInCents = products.reduce((total, product) => {
      const item = items.find((item) => item.productId === product.id)
      const quantity = item ? item.quantity : 1
      return total + product.priceInCents * quantity
    }, 0)

    const [order] = await db
      .insert(orders)
      .values({ totalInCents, status: 'processing', userId: sub })
      .returning()

    await db.insert(orderItems).values(
      products.map((product) => {
        const item = items.find((item) => item.productId === product.id)
        const quantity = item ? item.quantity : 1
        const priceInCents = product.priceInCents * quantity

        return {
          productId: product.id,
          orderId: order.id,
          priceInCents,
          quantity,
        }
      }),
    )

    set.status = 'No Content'
  },
  {
    body: t.Object({
      items: t.Array(
        t.Object({
          productId: t.String(),
          quantity: t.Number({ minimum: 1 }),
        }),
      ),
    }),

    response: {
      204: t.Void(),
    },
  },
)
