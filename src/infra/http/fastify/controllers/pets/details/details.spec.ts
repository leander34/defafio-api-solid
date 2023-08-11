import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get Pet Details (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const createdPet = await prisma.pet.create({
      data: {
        name: 'Billy',
        type: 'dog',
        gender: 'male',
        about: 'Doido',
        age: 3,
        port: 1,
        energy: 1,
        independence: 1,
        ambience: 1,
        photos: {
          createMany: {
            data: [
              {
                name: 'pegando_o_rabo',
                url: 'http:localhost:3333/pegando_o_rabo.jpg',
              },
              {
                name: 'brincando',
                url: 'http:localhost:3333/brincando.jpg',
              },
            ],
          },
        },
        requirements: {
          createMany: {
            data: [
              {
                requirement: 'Gostar de ficar perto',
              },
              {
                requirement: 'Ter paciencia',
              },
            ],
          },
        },
        org: {
          create: {
            name: 'Cachorro.com',
            email: 'johndoe@exemplo.com',
            password_hash: await hash('123456', 6),
            whats_app_phone: '35987135068',
            address: {
              create: {
                street: 'rua',
                number: 'number',
                city: 'city',
                state: 'state',
                zipcode: 'zipcode',
              },
            },
          },
        },
      },
    })
    const response = await request(app.server)
      .get(`/pets/details/${createdPet.id}`)
      .send()

    const { pet } = response.body
    expect(response.status).toEqual(200)
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        orgId: expect.any(String),
        type: 'dog',
        gender: 'male',
        name: 'Billy',
        about: 'Doido',
        age: 3,
        port: 1,
        energy: 1,
        independence: 1,
        ambience: 1,
        createdAt: expect.any(String),
        photos: [
          expect.objectContaining({
            id: expect.any(String),
            url: 'http:localhost:3333/pegando_o_rabo.jpg',
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: 'http:localhost:3333/brincando.jpg',
          }),
        ],
        requirements: [
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Gostar de ficar perto',
          }),
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Ter paciencia',
          }),
        ],
        org: expect.objectContaining({
          id: expect.any(String),
          name: 'Cachorro.com',
          email: 'johndoe@exemplo.com',
          whatsAppPhone: '35987135068',
          createdAt: expect.any(String),
          address: expect.objectContaining({
            id: expect.any(String),
            street: 'rua',
            number: 'number',
            city: 'city',
            state: 'state',
            zipcode: 'zipcode',
          }),
        }),
      }),
    )
  })
})
