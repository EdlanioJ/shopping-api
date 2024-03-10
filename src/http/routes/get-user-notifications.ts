import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { notifications } from '@/db/schema'
import { count, desc, eq } from 'drizzle-orm'

export const getUserNotifications = new Elysia().use(auth).get(
  '/notifications',
  async ({ getCurrentUser, query }) => {
    const { sub } = await getCurrentUser()
    const { pageIndex } = query
    const sq = db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, sub))

    const [notificationsCount] = await db
      .select({ count: count() })
      .from(sq.as('sql'))

    const allNotifications = await sq
      .orderBy(desc(notifications.createdAt))
      .limit(10)
      .offset(pageIndex * 10)

    return {
      notifications: allNotifications,
      totalCount: notificationsCount.count,
      pageIndex,
      perPage: 10,
    }
  },
  {
    query: t.Object({
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
