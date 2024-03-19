import { Elysia, t } from 'elysia'

import { db } from '../../db/connection'
import { AuthenticationError } from './errors/authetication-error'
import { comparePassword } from '../../utils/bcrypt'
import { auth } from '../auth'

export const login = new Elysia().use(auth).post(
  '/login',
  async ({ body, generateToken }) => {
    const { email, password } = body

    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })
    if (!user) throw new AuthenticationError()

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) throw new AuthenticationError()

    const accessToken = await generateToken({ sub: user.id, name: user.name })
    return { accessToken }
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 8 }),
    }),
    response: {
      200: t.Object({ accessToken: t.String() }),
    },
  },
)
