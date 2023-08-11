import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
describe('Register (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to authenticate as a org', async () => {
    await prisma.org.create({
      data: {
        name: 'Carrocho',
        email: 'johndoe@exemplo.com',
        password_hash: await hash('123456', 6),
        whats_app_phone: '35987135068',
        address: {
          create: {
            street: 'dog',
            number: '111',
            city: 'dos dogs',
            state: 'dg',
            zipcode: '37900999',
          },
        },
      },
      include: {
        address: true,
      },
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@exemplo.com',
      password: '123456',
    })
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
