import { PetNotFound } from '@/application/errors/pet-not-found'
import { PetRepository } from '@/application/repositories/pet-repository'

interface GetPetDetailsUseCaseRequest {
  id: string
}

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute({ id }: GetPetDetailsUseCaseRequest) {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new PetNotFound()
    }

    return {
      pet,
    }
  }
}
