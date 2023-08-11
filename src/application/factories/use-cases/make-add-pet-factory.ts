import { AddPetUseCase } from '@/application/use-cases/add-pet'
import { PrismaPetRepository } from '@/infra/repositories/prisma/prisma-pet-repository'

export function makeAddPetFactory() {
  const petRepository = new PrismaPetRepository()
  const addPetUseCase = new AddPetUseCase(petRepository)

  return addPetUseCase
}
