import { ExistsOrgWithTheSameEmailOrWhatsAppError } from '@/application/errors/exists-org-with-the-same-email-or-whats-app-error'
import { makeRegisterOrgFactory } from '@/application/factories/use-cases/make-register-org-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export class Register {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerSchemaBody = z.object({
      name: z.string().nonempty('Name is missing.'),
      email: z.string().email('Invalid format email.'),
      password: z.string().nonempty('Password is missing.'),
      whatsAppPhone: z.string().nonempty('WhatsApp phone is missing.'),
      street: z.string().nonempty('Street is missing.'),
      number: z.string().nonempty('Number is missing.'),
      city: z.string().nonempty('City is missing.'),
      state: z.string().nonempty('State is missing.'),
      zipcode: z.string().nonempty('Zipcode is missing.'),
    })

    const {
      name,
      email,
      whatsAppPhone,
      password,
      street,
      number,
      city,
      state,
      zipcode,
    } = registerSchemaBody.parse(request.body)

    try {
      const register = makeRegisterOrgFactory()

      await register.execute({
        name,
        email,
        whatsAppPhone,
        password,
        street,
        number,
        city,
        state,
        zipcode,
      })
      return reply.status(201).send()
    } catch (error) {
      if (error instanceof ExistsOrgWithTheSameEmailOrWhatsAppError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }
  }
}
