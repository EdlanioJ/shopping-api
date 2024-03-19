import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getCategories = new Elysia().use(auth).get(
  '/categories',
  async ({ getCurrentUser }) => {
    await getCurrentUser()
    const categories = await db.query.categories.findMany({
      orderBy: (fields, { asc }) => asc(fields.createdAt),
    })

    return categories
  },
  {
    response: {
      200: t.Array(
        t.Object({
          name: t.String(),
          id: t.String(),
          createdAt: t.Nullable(t.Date()),
          updatedAt: t.Nullable(t.Date()),
          slug: t.String(),
        }),
      ),
    },
  },
)
