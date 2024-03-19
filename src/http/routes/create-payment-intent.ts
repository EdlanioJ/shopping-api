import { Elysia, t } from 'elysia'

import { auth } from '../auth'
import { stripe } from '@/libs/stripe'
import { db } from '@/db/connection'

export const createPaymentIntent = new Elysia().use(auth).post(
  '/payment/intents',
  async ({ getCurrentUser, body, set }) => {
    const { sub } = await getCurrentUser()
    const { amount } = body

    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => eq(fields.id, sub),
    })

    const customer = await stripe.customers.create({
      email: user?.email,
      name: user?.name,
    })

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      {
        apiVersion: '2023-10-16',
      },
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aoa',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    set.status = 'Created'

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customer.id,
    }
  },
  {
    body: t.Object({
      amount: t.Integer(),
    }),

    response: {
      201: t.Object({
        paymentIntent: t.String(),
        ephemeralKey: t.String(),
        customerId: t.String(),
      }),
    },
  },
)
