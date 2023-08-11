import { makeAddPetFactory } from '@/application/factories/use-cases/make-add-pet-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export class Add {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const addSchemaBody = z.object({
      name: z.string().nonempty('Name is required.'),
      type: z.enum(['dog', 'cat']),
      gender: z.enum(['male', 'female']),
      about: z.string().nonempty('Name is required.'),
      age: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      port: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      energy: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      independence: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      ambience: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      photos: z.array(
        z.object({
          name: z.string().nonempty(''),
          url: z.string().url(''),
        }),
      ),
      requirements: z.array(
        z.object({
          requirement: z.string().nonempty(''),
        }),
      ),
    })

    const data = addSchemaBody.parse(request.body)

    const addPet = makeAddPetFactory()
    const { pet } = await addPet.execute({ orgId: request.user.sub, ...data })

    return reply.status(201).send()
  }
}
