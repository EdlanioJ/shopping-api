import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { eq, sql } from 'drizzle-orm'
import { addresses } from '@/db/schema'

export const getAddressesCount = new Elysia()
  .use(auth)
  .get('/addresses/count', async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()

    const [address] = await db
      .select({
        count: sql`count(${addresses.id})`.mapWith(Number),
      })
      .from(addresses)
      .where(eq(addresses.owner, sub))
      .groupBy(addresses.owner)

    return { count: address?.count ?? 0 }
  })
