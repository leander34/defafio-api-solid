/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CreatePetInputWithPhotoAndRequirement,
  PetWithPhotosAndRequirements,
  ListPets,
  PetDetails,
} from '@/@types/pet'
import { PetRepository } from '@/application/repositories/pet-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetRepository implements PetRepository {
  async add(
    pet: CreatePetInputWithPhotoAndRequirement,
  ): Promise<PetWithPhotosAndRequirements> {
    const photos: Prisma.PhotoCreateManyPetInput[] = pet.photos.map(
      (photo) => ({
        name: photo.name,
        url: photo.url,
      }),
    )
    const requirements: Prisma.RequirementCreateManyPetInput[] =
      pet.requirements.map((requirement) => ({
        requirement: requirement.requirement,
      }))
    const createdPet = await prisma.pet.create({
      data: {
        name: pet.name,
        type: pet.type,
        gender: pet.gender,
        about: pet.about,
        age: pet.age,
        port: pet.port,
        energy: pet.energy,
        independence: pet.independence,
        ambience: pet.ambience,
        photos: {
          createMany: {
            data: photos,
          },
        },
        requirements: {
          createMany: {
            data: requirements,
          },
        },
        org: {
          connect: {
            id: pet.orgId,
          },
        },
      },
      include: {
        photos: true,
        requirements: true,
      },
    })

    return {
      ...createdPet,
      age: createdPet.age as 1 | 2 | 3,
      port: createdPet.port as 1 | 2 | 3,
      ambience: createdPet.ambience as 1 | 2 | 3,
      independence: createdPet.independence as 1 | 2 | 3,
      energy: createdPet.energy as 1 | 2 | 3 | 4,
      orgId: createdPet.org_id,
      createdAt: createdPet.created_at,
      updatedAt: createdPet.updated_at,
      deletedAt: createdPet.deleted_at,
      adoptedAt: createdPet.adopted_at,
      photos: createdPet.photos.map((photo) => ({
        id: photo.id,
        name: photo.name,
        url: photo.url,
        createdAt: photo.created_at,
        deletedAt: photo.deleted_at,
        updatedAt: photo.updated_at,
        petId: photo.pet_id,
      })),
      requirements: createdPet.requirements.map((requirement) => ({
        id: requirement.id,
        requirement: requirement.requirement,
        createdAt: requirement.created_at,
        deletedAt: requirement.deleted_at,
        updatedAt: requirement.updated_at,
        petId: requirement.pet_id,
      })),
    }
  }

  async findManyWithFilters({
    city,
    page,
    ...filters
  }: {
    city: string
    type: 'dog' | 'cat' | null
    gender: 'male' | 'female' | null
    age: 1 | 2 | 3 | null
    energy: 1 | 2 | 3 | 4 | null
    port: 1 | 2 | 3 | null
    independence: 1 | 2 | 3 | null
    ambience: 1 | 2 | 3 | null
    page: number
  }): Promise<ListPets> {
    const where: Prisma.PetWhereInput = {
      org: {
        address: {
          city,
        },
      },
    }

    if (filters.age) {
      where.age = filters.age
    }
    if (filters.port) {
      where.port = filters.port
    }

    if (filters.ambience) {
      where.ambience = filters.ambience
    }
    if (filters.independence) {
      where.independence = filters.independence
    }

    if (filters.energy) {
      where.energy = filters.energy
    }
    if (filters.gender) {
      where.gender = filters.gender
    }

    if (filters.type) {
      where.type = filters.type
    }

    const pets = await prisma.pet.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
      include: {
        photos: true,
        org: {
          include: {
            address: true,
          },
        },
      },
    })

    const petsMapped = pets.map((pet) => {
      const photo = pet.photos[0]
      return {
        id: pet.id,
        name: pet.name,
        about: pet.about,
        gender: pet.gender,
        type: pet.type,
        age: pet.age as 1 | 2 | 3,
        port: pet.port as 1 | 2 | 3,
        ambience: pet.ambience as 1 | 2 | 3,
        independence: pet.independence as 1 | 2 | 3,
        energy: pet.energy as 1 | 2 | 3 | 4,
        orgId: pet.org_id,
        createdAt: pet.created_at,
        adoptedAt: pet.adopted_at,
        photo: {
          id: photo.id,
          url: photo.url,
        },
        org: {
          id: pet.org.id,
          name: pet.org.name,
          email: pet.org.email,
          whatsAppPhone: pet.org.whats_app_phone,
          address: {
            id: pet.org.address!.id,
            street: pet.org.address!.street,
            number: pet.org.address!.number,
            city: pet.org.address!.city,
            state: pet.org.address!.state,
            zipcode: pet.org.address!.zipcode,
          },
        },
      }
    })
    const petsCount = await prisma.pet.count({ where })
    return {
      pets: petsMapped,
      petsCount,
    }
  }

  async findById(id: string): Promise<PetDetails | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        gender: true,
        about: true,
        age: true,
        port: true,
        ambience: true,
        independence: true,
        energy: true,
        org_id: true,
        created_at: true,
        adopted_at: true,
        photos: true,
        requirements: true,
        org: {
          select: {
            id: true,
            name: true,
            email: true,
            whats_app_phone: true,
            created_at: true,
            address: {
              select: {
                id: true,
                street: true,
                number: true,
                city: true,
                state: true,
                zipcode: true,
              },
            },
          },
        },
      },
    })

    if (!pet) {
      return null
    }

    return {
      id: pet.id,
      name: pet.name,
      about: pet.about,
      gender: pet.gender,
      type: pet.type,
      age: pet.age as 1 | 2 | 3,
      port: pet.port as 1 | 2 | 3,
      ambience: pet.ambience as 1 | 2 | 3,
      independence: pet.independence as 1 | 2 | 3,
      energy: pet.energy as 1 | 2 | 3 | 4,
      orgId: pet.org_id,
      createdAt: pet.created_at,
      adoptedAt: pet.adopted_at,
      photos: pet.photos.map((photo) => ({
        id: photo.id,
        name: photo.name,
        url: photo.url,
      })),
      requirements: pet.requirements.map((requirement) => ({
        id: requirement.id,
        requirement: requirement.requirement,
      })),
      org: {
        id: pet.org.id,
        name: pet.org.name,
        email: pet.org.email,
        whatsAppPhone: pet.org.whats_app_phone,
        createdAt: pet.org.created_at,
        address: {
          id: pet.org.address!.id,
          street: pet.org.address!.street,
          number: pet.org.address!.number,
          city: pet.org.address!.city,
          state: pet.org.address!.state,
          zipcode: pet.org.address!.zipcode,
        },
      },
    }
  }
}
