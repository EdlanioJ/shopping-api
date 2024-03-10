import { createId } from '@paralleldrive/cuid2'
import { text, integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { products } from './products'
import { users } from './users'

export const reviews = pgTable('reviews', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  productId: text('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  userId: text('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),

  comment: text('comment').notNull(),
  rating: integer('rating').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}))
