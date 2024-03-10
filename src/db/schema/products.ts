import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { productCategories } from './product-categories'
import { reviews } from './reviews'

export const products = pgTable('products', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  description: text('description'),
  stock: integer('stock').notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const productsReleations = relations(products, ({ many }) => ({
  productCategories: many(productCategories),
  reviews: many(reviews),
}))
