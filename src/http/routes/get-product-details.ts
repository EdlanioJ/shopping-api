import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'
import { products, reviews } from '@/db/schema'
import { avg, eq, sql } from 'drizzle-orm'

export const getProductDetails = new Elysia().use(auth).get(
  '/products/:id',
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
        rating: avg(reviews.rating).mapWith(Number),
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

    return { ...product, isFavorite: !!favorite }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
)
