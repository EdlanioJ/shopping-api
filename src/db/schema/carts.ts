import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from './users'
import { products } from './products'

export const carts = pgTable(
  'carts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    productId: text('product_id')
      .notNull()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    quantity: integer('quantity').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productId, table.userId],
      name: 'cart_product',
    }),
  }),
)

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),

  product: one(products, {
    fields: [carts.productId],
    references: [products.id],
  }),
}))
