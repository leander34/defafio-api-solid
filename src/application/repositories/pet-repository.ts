import {
  CreatePetInputWithPhotoAndRequirement,
  ListPets,
  PetDetails,
  PetWithPhotosAndRequirements,
} from '@/@types/pet'

export interface PetRepository {
  add(
    pet: CreatePetInputWithPhotoAndRequirement,
  ): Promise<PetWithPhotosAndRequirements>

  findManyWithFilters(data: {
    city: string
    type: 'dog' | 'cat' | null
    gender: 'male' | 'female' | null
    age: 1 | 2 | 3 | null
    energy: 1 | 2 | 3 | 4 | null
    port: 1 | 2 | 3 | null
    independence: 1 | 2 | 3 | null
    ambience: 1 | 2 | 3 | null
    page: number
  }): Promise<ListPets>

  findById(id: string): Promise<PetDetails | null>
}
