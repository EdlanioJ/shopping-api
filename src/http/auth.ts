import { bearer } from '@elysiajs/bearer'
import { Elysia, Static, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import { InvaildEmailOrPasswordError } from './routes/errors/invalid-email-or-password-error'
import { UnauthorizedError } from './routes/errors/unauthorized-error'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  name: t.String(),
})

export const auth = new Elysia()
  .error({
    INVALID_EMAIL_OR_PASSWORD: InvaildEmailOrPasswordError,
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'INVALID_EMAIL_OR_PASSWORD':
        set.status = 401
        return { code, message: error.message }
      case 'UNAUTHORIZED':
        set.status = 400
        return { code, message: error.message }
      default:
        return { code, message: error.message }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      name: 'jwt',
      exp: '2d',
    }),
  )
  .use(bearer())
  .derive(({ jwt, bearer }) => {
    return {
      generateToken: async (payload: Static<typeof jwtPayloadSchema>) => {
        const token = await jwt.sign({ ...payload })
        return token
      },

      getCurrentUser: async () => {
        const payload = await jwt.verify(bearer)

        if (!payload) throw new UnauthorizedError()

        return payload
      },
    }
  })
