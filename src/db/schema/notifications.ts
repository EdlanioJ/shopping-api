import { createId } from '@paralleldrive/cuid2'
import {
  boolean,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { relations } from 'drizzle-orm'

export const notificationTypeEnum = pgEnum('notification_status', [
  'product',
  'order',
])

export const notifications = pgTable('notifications', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  isOpened: boolean('is_opened'),
  type: notificationTypeEnum('type').notNull(),
  data: json('data').$type<{
    id?: string
    title: string
    body: string
    tag?: string
    image?: string
  }>(),
  userId: text('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))
