import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts, orderItems, orders, products } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const checkout = new Elysia().use(auth).post(
  '/checkout',
  async ({ getCurrentUser, set }) => {
    const { sub } = await getCurrentUser()
    const cartItems = await db
      .select({
        productId: carts.productId,
        quantity: carts.quantity,
        productPriceInCents: products.priceInCents,
      })
      .from(carts)
      .innerJoin(products, eq(carts.productId, products.id))
      .where(eq(carts.userId, sub))

    const totalInCents = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.productPriceInCents,
      0,
    )

    const [order] = await db
      .insert(orders)
      .values({
        totalInCents,
        userId: sub,
        status: 'processing',
      })
      .returning()

    await db.insert(orderItems).values(
      cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceInCents: item.productPriceInCents,
      })),
    )

    await db.delete(carts).where(eq(carts.userId, sub))
    set.status = 'No Content'
  },
  {
    response: { 204: t.Void() },
  },
)
