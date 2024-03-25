import { Elysia, t } from 'elysia'

import { auth } from '@/http/auth'
import { db } from '@/db/connection'
import { favorites } from '@/db/schema'
import { BadRequestError } from '@/http/routes/errors/bad-request-error'

export const addFavoriteProduct = new Elysia().use(auth).post(
  '/:productId',
  async ({ getCurrentUser, params, set }) => {
    const { sub } = await getCurrentUser()
    const { productId } = params

    const favorite = await db.query.favorites.findFirst({
      where: (fields, { and, eq }) =>
        and(eq(fields.userId, sub), eq(fields.productId, productId)),
    })

    if (favorite) throw new BadRequestError('Product already in favorites')

    await db.insert(favorites).values({ userId: sub, productId })
    set.status = 'No Content'
  },
  {
    params: t.Object({
      productId: t.String(),
    }),

    response: {
      204: t.Void(),
    },
  },
)
