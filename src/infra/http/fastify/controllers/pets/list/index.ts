import { makeListPetsFactory } from '@/application/factories/use-cases/make-list-pets.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class List {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const listPetsBodySchema = z.object({
      city: z.string().nonempty('City is required.'),
      type: z.enum(['dog', 'cat']).nullable().default(null),
      gender: z.enum(['male', 'female']).nullable().default(null),
      age: z
        .union([z.literal(1), z.literal(2), z.literal(3)])
        .nullable()
        .default(null),
      energy: z
        .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
        .nullable()
        .default(null),
      port: z
        .union([z.literal(1), z.literal(2), z.literal(3)])
        .nullable()
        .default(null),
      independence: z
        .union([z.literal(1), z.literal(2), z.literal(3)])
        .nullable()
        .default(null),
      ambience: z
        .union([z.literal(1), z.literal(2), z.literal(3)])
        .nullable()
        .default(null),
      page: z.coerce.number().min(1).default(1),
    })

    const data = listPetsBodySchema.parse(request.body)
    const listPets = makeListPetsFactory()

    const { pets, petsCount } = await listPets.execute(data)

    return {
      pets,
      petsCount,
    }
  }
}
