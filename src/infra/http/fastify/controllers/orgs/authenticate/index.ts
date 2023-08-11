import { InvalidCredentials } from '@/application/errors/invalid-credentials'
import { makeAuthenticateFactory } from '@/application/factories/use-cases/make-authenticate-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export class Authenticate {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerSchemaBody = z.object({
      email: z.string().email('Invalid format email.'),
      password: z.string().nonempty('Password is missing.'),
    })

    const { email, password } = registerSchemaBody.parse(request.body)
    const authenticate = makeAuthenticateFactory()

    try {
      const { org } = await authenticate.execute({ email, password })

      const token = await reply.jwtSign(
        {
          role: org.role,
        },
        {
          sign: {
            sub: org.id,
          },
        },
      )
      const refreshToken = await reply.jwtSign(
        {
          role: org.role,
        },
        {
          sign: {
            sub: org.id,
            expiresIn: '7d',
          },
        },
      )

      return reply
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .send({
          token,
        })
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        return reply.status(400).send({ message: error.message })
      }

      throw error
    }
  }
}
