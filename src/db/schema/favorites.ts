import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from './users'
import { products } from './products'

export const favorites = pgTable('favorites', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  productId: text('product_id')
    .references(() => products.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
}))
