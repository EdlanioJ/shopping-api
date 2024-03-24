import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { carts } from '@/db/schema'

export const addCartItems = new Elysia().use(auth).post(
  '/',
  async ({ getCurrentUser, body, set }) => {
    const { sub } = await getCurrentUser()
    const { items } = body

    await db
      .insert(carts)
      .values(
        items.map((item) => ({
          productId: item.productId,
          userId: sub,
          quantity: item.quantity ?? 1,
        })),
      )
      .onConflictDoNothing({ target: [carts.productId, carts.userId] })

    set.status = 'No Content'
  },
  {
    body: t.Object({
      items: t.Array(
        t.Object({
          productId: t.String(),
          quantity: t.Optional(t.Number({ minimum: 1 })),
        }),
      ),
    }),
    response: {
      204: t.Void(),
    },
  },
)
