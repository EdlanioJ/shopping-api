import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { products, reviews } from '@/db/schema'
import { count, eq } from 'drizzle-orm'

export const getUserReviews = new Elysia().use(auth).get(
  '/reviews/me',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()
    const { pageIndex } = query

    const sq = db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        productName: products.name,
        createdAt: reviews.createdAt,
        productId: reviews.productId,
        productImage: products.image,
      })
      .from(reviews)
      .innerJoin(products, eq(products.id, reviews.productId))
      .where(eq(reviews.userId, sub))

    const [reviewsCount] = await db.select({ count: count() }).from(sq.as('sq'))
    const allReviews = await sq.limit(10).offset(pageIndex * 10)

    return {
      reviews: allReviews,
      pageIndex,
      perPage: 10,
      totalCount: reviewsCount.count,
    }
  },
  {
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
