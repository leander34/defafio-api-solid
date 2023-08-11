import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  const org = await prisma.org.create({
    data: {
      name: 'Cachorros',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      whats_app_phone: '35987135068',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      address: {
        create: {
          street: 'Rua',
          number: '001',
          city: 'dog',
          state: 'dg',
          zipcode: '37900999',
        },
      },
    },
  })

  const responseAuthenticate = await request(app.server)
    .post('/sessions')
    .send({
      email: org.email,
      password: '123456',
    })

  const { token } = responseAuthenticate.body
  return {
    token,
  }
}
