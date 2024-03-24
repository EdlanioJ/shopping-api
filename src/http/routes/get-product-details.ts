import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'
import { products, reviews } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export const getProductDetails = new Elysia().use(auth).get(
  '/:id',
  async ({ getCurrentUser, params }) => {
    const { sub } = await getCurrentUser()

    const { id } = params

    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        pricePriceInCents: products.priceInCents,
        description: products.description,
        review: sql`count(${reviews.id})`.mapWith(Number),
        rating: sql`avg(${reviews.rating})`.mapWith(Number),
      })
      .from(products)
      .where(eq(products.id, id))
      .leftJoin(reviews, eq(reviews.productId, products.id))
      .groupBy(products.id)

    if (!product) throw new Error('Product not found')

    const favorite = await db.query.favorites.findFirst({
      where: (fields, { and, eq }) =>
        and(eq(fields.productId, id), eq(fields.userId, sub)),
    })

    return {
      ...product,
      rating: product.rating ?? 0,
      review: product.review ?? 0,
      isFavorite: !!favorite,
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      200: t.Object({
        id: t.String(),
        name: t.String(),
        image: t.String(),
        pricePriceInCents: t.Number(),
        description: t.Nullable(t.String()),
        review: t.Number(),
        rating: t.Number(),
        isFavorite: t.Boolean(),
      }),
    },
  },
)
