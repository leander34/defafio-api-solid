export interface CreatePhotoInput {
  id?: string | undefined
  petId?: string | undefined
  name: string
  url: string
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
  deletedAt?: string | Date | undefined
}

export interface CreateRequirementInput {
  id?: string | undefined
  petId?: string | undefined
  requirement: string
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
  deletedAt?: string | Date | undefined
}

export interface Photo {
  id: string
  petId: string
  name: string
  url: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface Requirement {
  id: string
  petId: string
  requirement: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface CreatePetInputWithPhotoAndRequirement {
  id?: string | undefined
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
  photos: CreatePhotoInput[]
  requirements: CreateRequirementInput[]
  adoptedAt?: string | Date | undefined
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
  deletedAt?: string | Date | undefined
}

export interface Pet {
  id: string
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
  adoptedAt: Date | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface PetDetails {
  id: string
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
  adoptedAt: Date | null
  createdAt: Date
  photos: {
    id: string
    name: string
    url: string
  }[]
  requirements: {
    id: string
    requirement: string
  }[]
  org: Omit<Org, 'passwordHash' | 'updatedAt' | 'deletedAt'> & {
    address: {
      id: string
      street: string
      number: string
      city: string
      state: string
      zipcode: string
    }
  }
}

export interface PetWithPhotosAndRequirements {
  id: string
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
  photos: Photo[]
  requirements: Requirement[]
  adoptedAt: Date | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface ListPets {
  pets: {
    id: string
    orgId: string
    type: 'dog' | 'cat'
    gender: 'male' | 'female'
    name: string
    age: 1 | 2 | 3
    energy: 1 | 2 | 3 | 4
    port: 1 | 2 | 3
    independence: 1 | 2 | 3
    ambience: 1 | 2 | 3
    createdAt: Date
    photo: {
      id: string
      url: string
    }
    org: Omit<Org, 'passwordHash' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      address: {
        id: string
        street: string
        number: string
        city: string
        state: string
        zipcode: string
      }
    }
  }[]
  petsCount: number
}

export interface PetDatabase {
  id: string
  org_id: string
  type: 'dog' | 'cat'
  gender: 'male' | 'female'
  name: string
  about: string
  age: 1 | 2 | 3
  port: 1 | 2 | 3
  energy: 1 | 2 | 3 | 4
  independence: 1 | 2 | 3
  ambience: 1 | 2 | 3
  adopted_at: Date | null
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface PhotoDatabase {
  id: string
  pet_id: string
  name: string
  url: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface RequirementDatabase {
  id: string
  pet_id: string
  requirement: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
