import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { eq, sql } from 'drizzle-orm'
import { reviews } from '@/db/schema'

export const getReviewsCount = new Elysia().use(auth).get(
  '/count',
  async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()
    const [review] = await db
      .select({
        count: sql`count(${reviews.id})`.mapWith(Number),
      })
      .from(reviews)
      .where(eq(reviews.userId, sub))
      .groupBy(reviews.userId)

    return { count: review?.count ?? 0 }
  },
  {
    response: {
      200: t.Object({
        count: t.Number(),
      }),
    },
  },
)
