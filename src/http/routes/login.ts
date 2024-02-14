import { Elysia, t } from 'elysia'

import { db } from '../../db/connection'
import { InvaildEmailOrPasswordError } from './errors/invalid-email-or-password-error'
import { comparePassword } from '../../utils/bcrypt'
import { auth } from '../auth'

export const login = new Elysia().use(auth).post(
  '/login',
  async ({ body, generateToken, set }) => {
    const { email, password } = body

    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })
    if (!user) throw new InvaildEmailOrPasswordError()

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) throw new InvaildEmailOrPasswordError()

    const accessToken = await generateToken({ sub: user.id, name: user.name })
    set.status = 200
    return { accessToken }
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 8 }),
    }),
  },
)
