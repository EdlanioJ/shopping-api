import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
