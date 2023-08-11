import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
describe('Add pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to add new pets', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)
    const response = await request(app.server)
      .post('/pets/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'dog',
        gender: 'male',
        name: 'Billy',
        about: 'Louco',
        age: 1,
        port: 1,
        energy: 2,
        independence: 1,
        ambience: 1,
        photos: [
          { name: 'brincando', url: 'http:localhost:3333/brincando.jpg' },
          {
            name: 'pegando o rabo',
            url: 'http:localhost:3333/pegando_o_rabo.jpg',
          },
        ],
        requirements: [
          { requirement: 'Ter paciencia' },
          { requirement: 'Gostar de ficar perto' },
        ],
      })

    expect(response.status).toEqual(201)
  })
})
