/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Org } from '@/@types/org'
import {
  CreatePetInputWithPhotoAndRequirement,
  PetWithPhotosAndRequirements,
  PetDatabase,
  PhotoDatabase,
  RequirementDatabase,
  Requirement,
  Photo,
  ListPets,
  PetDetails,
} from '@/@types/pet'
import { AddressRepository } from '@/application/repositories/address-repository'
import { OrgRepository } from '@/application/repositories/org-repository'
import { PetRepository } from '@/application/repositories/pet-repository'
import { filterPerts } from '@/utils/filter-pets'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public pets: PetDatabase[] = []
  public photos: PhotoDatabase[] = []
  public requirements: RequirementDatabase[] = []

  constructor(
    private orgRepository: OrgRepository,
    private addressRepository: AddressRepository,
  ) {}

  async findById(id: string): Promise<PetDetails | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    const photos = this.photos.filter((photo) => photo.pet_id === pet.id)
    const requirements = this.requirements.filter(
      (requirement) => requirement.pet_id === pet.id,
    )
    const org = (await this.orgRepository.findById(pet.org_id)) as Org
    const address = await this.addressRepository.findByOrgId(pet.org_id)

    return {
      ...pet,
      orgId: pet.org_id,
      createdAt: pet.created_at,
      adoptedAt: pet.adopted_at,
      photos,
      requirements,
      org: {
        id: org.id,
        name: org.name,
        email: org.email,
        whatsAppPhone: org.whatsAppPhone,
        createdAt: org.createdAt,
        address: {
          id: address.id,
          street: address.street,
          number: address.number,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
        },
      },
    }
  }

  async findManyWithFilters({
    page,
    city,
    ...filters
  }: {
    city: string
    type: 'dog' | 'cat' | null
    gender: 'male' | 'female' | null
    age: 1 | 2 | 3 | null
    energy: 1 | 2 | 3 | null
    port: 1 | 2 | 3 | null
    independence: 1 | 2 | 3 | null
    ambience: 1 | 2 | 3 | null
    page: number
  }): Promise<ListPets> {
    const orgs = await this.orgRepository.findManyByCity(city)
    const orgsId = orgs.map((org) => org.id)

    if (orgs.length === 0) {
      return {
        pets: [],
        petsCount: 0,
      }
    }

    const allPets = this.pets.map((pet) => {
      const petPhotos = this.photos.filter((photo) => photo.pet_id === pet.id)
      return {
        id: pet.id,
        orgId: pet.org_id,
        type: pet.type,
        gender: pet.gender,
        name: pet.name,
        age: pet.age,
        energy: pet.energy,
        port: pet.port,
        independence: pet.independence,
        ambience: pet.ambience,
        createdAt: pet.created_at,
        photo: {
          id: petPhotos[0].id,
          url: petPhotos[0].url,
        },
      }
    })

    const orgsPets = allPets.filter((pet) => orgsId.includes(pet.orgId))

    const filtredPets = filterPerts(orgsPets, { ...filters })
    const paginatedPets = filtredPets.slice((page - 1) * 20, page * 20)

    const pets = paginatedPets.map((pet) => {
      const org = orgs.find((org) => org.id === pet.orgId)!
      return {
        ...pet,
        org,
      }
    })

    return {
      pets,
      petsCount: filtredPets.length,
    }
  }

  async add(
    pet: CreatePetInputWithPhotoAndRequirement,
  ): Promise<PetWithPhotosAndRequirements> {
    const petId = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    const deletedAt = null
    const createdPet = {
      id: petId,
      org_id: pet.orgId,
      type: pet.type,
      gender: pet.gender,
      name: pet.name,
      about: pet.about,
      age: pet.age,
      port: pet.port,
      energy: pet.energy,
      independence: pet.independence,
      ambience: pet.ambience,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
      adopted_at: null,
    }

    this.pets.push(createdPet)
    const requirements: Requirement[] = []
    for (const requirement of pet.requirements) {
      const requirementId = randomUUID()
      this.requirements.push({
        id: requirementId,
        pet_id: petId,
        requirement: requirement.requirement,
        created_at: createdAt,
        updated_at: updatedAt,
        deleted_at: deletedAt,
      })

      requirements.push({
        id: requirementId,
        petId,
        requirement: requirement.requirement,
        createdAt,
        updatedAt,
        deletedAt,
      })
    }

    const photos: Photo[] = []

    for (const photo of pet.photos) {
      const photoId = randomUUID()
      this.photos.push({
        id: photoId,
        pet_id: petId,
        name: photo.name,
        url: photo.url,
        created_at: createdAt,
        updated_at: updatedAt,
        deleted_at: deletedAt,
      })
      photos.push({
        id: photoId,
        petId,
        name: photo.name,
        url: photo.url,
        createdAt,
        updatedAt,
        deletedAt,
      })
    }

    return {
      ...createdPet,
      id: petId,
      orgId: pet.orgId,
      adoptedAt: null,
      createdAt,
      updatedAt,
      deletedAt,
      photos,
      requirements,
    }
  }
}
