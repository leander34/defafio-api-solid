import { GetPetDetailsUseCase } from '@/application/use-cases/get-pet-details'
import { PrismaPetRepository } from '@/infra/repositories/prisma/prisma-pet-repository'

export function makeGetPetDetailsFactory() {
  const petRepository = new PrismaPetRepository()
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petRepository)

  return getPetDetailsUseCase
}
