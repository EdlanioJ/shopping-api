import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { relations } from 'drizzle-orm'

export const addresses = pgTable('addresses', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  owner: text('owner').notNull(),
  name: text('name').notNull(),
  street: text('street').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country'),
  zipCode: text('zip_code'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.owner],
    references: [users.id],
  }),
}))
