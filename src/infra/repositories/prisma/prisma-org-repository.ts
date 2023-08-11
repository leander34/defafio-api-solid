/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Address } from '@/@types/address'
import { CreateOrgWithAddressInput, Org } from '@/@types/org'
import { OrgRepository } from '@/application/repositories/org-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async create({
    name,
    email,
    passwordHash,
    whatsAppPhone,
    address: { street, number, city, state, zipcode },
  }: CreateOrgWithAddressInput): Promise<Org & { address: Address }> {
    const org = await prisma.org.create({
      data: {
        name,
        email,
        password_hash: passwordHash,
        whats_app_phone: whatsAppPhone,
        address: {
          create: {
            street,
            number,
            city,
            state,
            zipcode,
          },
        },
      },
      include: {
        address: true,
      },
    })

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.created_at,
      passwordHash: org.password_hash,
      role: org.role,
      address: {
        id: org.address!.id,
        orgId: org.address!.org_id,
        street: org.address!.street,
        number: org.address!.number,
        city: org.address!.city,
        state: org.address!.state,
        zipcode: org.address!.zipcode,
        createdAt: org.address!.created_at,
        updatedAt: org.address!.updated_at,
        deletedAt: org.address!.deleted_at,
      },
    }
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    if (!org) {
      return null
    }

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.created_at,
      passwordHash: org.password_hash,
    }
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (!org) {
      return null
    }

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.created_at,
      passwordHash: org.password_hash,
    }
  }

  async findByEmailOrWhatsApp({
    email,
    whatsAppPhone,
  }: {
    email: string
    whatsAppPhone: string
  }): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            whats_app_phone: whatsAppPhone,
          },
        ],
      },
    })

    if (!org) {
      return null
    }

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.created_at,
      passwordHash: org.password_hash,
    }
  }

  async findManyByCity(city: string): Promise<
    (Omit<Org, 'passwordHash' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      address: {
        id: string
        street: string
        number: string
        city: string
        state: string
        zipcode: string
      }
    })[]
  > {
    const orgsFoundAroundTown = await prisma.org.findMany({
      where: {
        address: {
          city,
        },
      },
      include: {
        address: true,
      },
    })

    const orgs = orgsFoundAroundTown.map((org) => {
      return {
        id: org.id,
        name: org.name,
        email: org.email,
        whatsAppPhone: org.whats_app_phone,
        role: org.role,
        address: {
          id: org.id,
          street: org.address!.street,
          number: org.address!.number,
          city: org.address!.city,
          state: org.address!.state,
          zipcode: org.address!.zipcode,
        },
      }
    })

    return orgs
  }
}
