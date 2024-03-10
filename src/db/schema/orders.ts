import { createId } from '@paralleldrive/cuid2'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const orderStatusEnum = pgEnum('order_status', [
  'delivered',
  'processing',
  'canceled',
])
export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'set null',
    })
    .notNull(),

  status: orderStatusEnum('status').default('processing').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
