import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'
import { addresses, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUserShippingAddress = new Elysia()
  .use(auth)
  .get('/address/shipping', async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()

    const [address] = await db
      .select({
        id: addresses.id,
        street: addresses.street,
        city: addresses.city,
        state: addresses.state,
        zipCode: addresses.zipCode,
        country: addresses.country,
        name: addresses.name,
      })
      .from(users)
      .where(eq(users.id, sub))
      .innerJoin(addresses, eq(addresses.id, users.shippingAddress))

    if (!address) return null

    return {
      id: address.id,
      name: address.name,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      },
    }
  })
