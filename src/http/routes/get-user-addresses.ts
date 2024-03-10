import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '@/db/connection'

export const getUserAddresses = new Elysia()
  .use(auth)
  .get('/addresses', async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser()

    const addresses = await db.query.addresses.findMany({
      where: (fields, { eq }) => eq(fields.owner, sub),
      orderBy: (fields, { desc }) => desc(fields.createdAt),
    })

    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => eq(fields.id, sub),
      columns: {
        shippingAddress: true,
      },
    })

    return {
      addresses: addresses.map((address) => ({
        id: address.id,
        name: address.name,
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        },
      })),
      shippingAddress: user?.shippingAddress,
    }
  })
