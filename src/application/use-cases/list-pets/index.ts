import { ListPets } from '@/@types/pet'
import { PetRepository } from '@/application/repositories/pet-repository'

interface ListPetsUseCaseRequest {
  city: string
  type: 'dog' | 'cat' | null
  gender: 'male' | 'female' | null
  age: 1 | 2 | 3 | null
  energy: 1 | 2 | 3 | 4 | null
  port: 1 | 2 | 3 | null
  independence: 1 | 2 | 3 | null
  ambience: 1 | 2 | 3 | null
  page: number
}

export class ListPetsUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute({
    city,
    type,
    gender,
    age,
    energy,
    port,
    independence,
    ambience,
    page,
  }: ListPetsUseCaseRequest): Promise<ListPets> {
    const { pets, petsCount } = await this.petRepository.findManyWithFilters({
      city,
      type,
      gender,
      age,
      energy,
      port,
      independence,
      ambience,
      page,
    })

    return {
      pets,
      petsCount,
    }
  }
}
