import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { favorites } from './favorites'
import { carts } from './carts'
import { reviews } from './reviews'
import { addresses } from './addresses'
import { notifications } from './notifications'

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  imageUrl: text('image_url'),

  shippingAddress: text('shipping_address').references(() => addresses.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ one, many }) => ({
  favorite: one(favorites, {
    fields: [users.id],
    references: [favorites.userId],
  }),

  cart: one(carts, {
    fields: [users.id],
    references: [carts.userId],
  }),

  shippingAddress: one(addresses, {
    fields: [users.shippingAddress],
    references: [addresses.id],
  }),

  reviews: many(reviews),
  addresses: many(addresses),
  notifications: many(notifications),
}))
