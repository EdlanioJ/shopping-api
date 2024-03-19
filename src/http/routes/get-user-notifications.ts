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
    response: {
      200: t.Object({
        notifications: t.Array(
          t.Object({
            id: t.String(),
            type: t.String(),
            isOpened: t.Nullable(t.Boolean()),
            createdAt: t.Nullable(t.Date()),
            userId: t.Nullable(t.String()),
            data: t.Nullable(
              t.Object({
                id: t.Optional(t.String()),
                title: t.String(),
                body: t.String(),
                tag: t.Optional(t.String()),
                image: t.Optional(t.String()),
              }),
            ),
          }),
        ),
        pageIndex: t.Number({ default: 0 }),
        perPage: t.Number({ default: 10 }),
        totalCount: t.Number({ default: 0 }),
      }),
    },
  },
)
