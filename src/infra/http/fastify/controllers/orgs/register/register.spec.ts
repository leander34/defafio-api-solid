import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
describe('Register (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    expect(response.status).toEqual(201)
  })
  it('should not be able to register a ORG with the same email than other', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    const response = await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135069',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    expect(response.status).toEqual(409)
  })
  it('should not be able to register a ORG with the same whatsApp phone than other', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    const response = await request(app.server).post('/orgs/register').send({
      name: 'Cachorros.com',
      email: 'johndoe2@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    expect(response.status).toEqual(409)
  })
})
