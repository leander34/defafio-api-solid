import { Pet } from '@/@types/pet'
import { PetRepository } from '@/application/repositories/pet-repository'

interface AddPetUseCaseRequest {
  orgId: string
  type: 'dog' | 'cat'
  gender: 'male' | 'female'
  name: string
  about: string
  age: 1 | 2 | 3
  port: 1 | 2 | 3
  energy: 1 | 2 | 3 | 4
  independence: 1 | 2 | 3
  ambience: 1 | 2 | 3
  photos: {
    name: string
    url: string
  }[]
  requirements: {
    requirement: string
  }[]
}

interface AddPetUseCaseResponse {
  pet: Pet
}

export class AddPetUseCase {
  constructor(private petRepository: PetRepository) {}
  async execute(data: AddPetUseCaseRequest): Promise<AddPetUseCaseResponse> {
    const pet = await this.petRepository.add(data)

    return {
      pet,
    }
  }
}
