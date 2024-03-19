import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  UPLOADCARE_PUBLIC_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
