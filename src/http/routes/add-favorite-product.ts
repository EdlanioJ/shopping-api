import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { favorites } from '@/db/schema'

export const addFavoriteProduct = new Elysia().use(auth).post(
  '/favorite/:productId',
  async ({ getCurrentUser, params, set }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params

    const favorite = await db.query.favorites.findFirst({
      where: (fields, { and, eq }) =>
        and(eq(fields.userId, sub), eq(fields.productId, productId)),
    })

    if (favorite) throw new Error('Product already in favorites')

    await db.insert(favorites).values({ userId: sub, productId })
    set.status = 201
  },
  {
    params: t.Object({
      productId: t.String(),
    }),
  },
)
