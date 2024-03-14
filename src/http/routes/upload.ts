import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { env } from '@/env'

export const upload = new Elysia().use(auth).post(
  '/upload',
  async ({ body }) => {
    const { file } = body

    const formData = new FormData()

    formData.append('UPLOADCARE_PUB_KEY', env.UPLOADCARE_PUBLIC_KEY)
    formData.append('uuid', file, file.name)
    const response = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    return {
      uuid: data.uuid,
      imageUrl: `https://ucarecdn.com/${data.uuid}/${file.name}`,
    }
  },
  {
    type: 'formdata',
    body: t.Object({
      file: t.File({
        type: ['image/jpeg', 'image/'],
        minSize: '1k',
        maxSize: '5m',
      }),
    }),
  },
)
