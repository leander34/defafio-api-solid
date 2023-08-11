import { ListPetsUseCase } from '@/application/use-cases/list-pets'
import { PrismaPetRepository } from '@/infra/repositories/prisma/prisma-pet-repository'

export function makeListPetsFactory() {
  const petRepository = new PrismaPetRepository()
  const listPetsUseCase = new ListPetsUseCase(petRepository)

  return listPetsUseCase
}
