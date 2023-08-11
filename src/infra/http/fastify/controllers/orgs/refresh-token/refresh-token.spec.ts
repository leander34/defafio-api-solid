import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to refresh token', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe@exemple.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })
    const authenticateReponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@exemple.com',
        password: '123456',
      })

    const cookies = authenticateReponse.get('Set-Cookie')

    const refreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(refreshResponse.status).toEqual(200)
    expect(refreshResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )

    expect(refreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
