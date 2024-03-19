import { avg, eq, sql } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

import { auth } from '../auth'
import { db } from '@/db/connection'
import { products, reviews, users } from '@/db/schema'

export const getProductReviews = new Elysia().use(auth).get(
  '/product/:id/reviews',
  async ({ getCurrentUser, params, query }) => {
    await getCurrentUser()
    const { id } = params
    const { pageIndex } = query
    const sq = db
      .select({
        id: reviews.id,
        userName: users.name,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .innerJoin(users, eq(users.id, reviews.userId))
      .where(eq(reviews.productId, id))

    const allReviews = await sq.limit(10).offset(pageIndex * 10)
    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        reviewsCount: sql`count(${reviews.id})`.mapWith(Number),
        ratingAvg: avg(reviews.rating).mapWith(Number),
      })
      .from(products)
      .where(eq(products.id, id))
      .leftJoin(reviews, eq(reviews.productId, products.id))
      .groupBy(products.id)

    return {
      product,
      reviews: allReviews,
      pageIndex,
      perPage: 10,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
    response: {
      200: t.Object({
        product: t.Object({
          id: t.String(),
          name: t.String(),
          image: t.String(),
          reviewsCount: t.Number({ default: 0 }),
          ratingAvg: t.Number({ default: 0 }),
        }),
        reviews: t.Array(
          t.Object({
            id: t.String(),
            userName: t.String(),
            rating: t.Number({ default: 0 }),
            comment: t.String(),
            createdAt: t.Nullable(t.Date()),
          }),
        ),
        pageIndex: t.Number({ default: 0 }),
        perPage: t.Number({ default: 10 }),
      }),
    },
  },
)
