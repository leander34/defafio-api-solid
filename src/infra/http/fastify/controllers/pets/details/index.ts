import { PetNotFound } from '@/application/errors/pet-not-found'
import { makeGetPetDetailsFactory } from '@/application/factories/use-cases/make-get-pet-details-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class Details {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const petDetailsParamsSchema = z.object({
      id: z.string().uuid('Invalid Id.'),
    })
    try {
      const { id } = petDetailsParamsSchema.parse(request.params)
      const getPetDetails = makeGetPetDetailsFactory()

      const { pet } = await getPetDetails.execute({ id })

      return {
        pet,
      }
    } catch (error) {
      if (error instanceof PetNotFound) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      throw error
    }
  }
}
