/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateAddressInput, Address } from '@/@types/address'
import { AddressRepository } from '@/application/repositories/address-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressRepository implements AddressRepository {
  async create(address: CreateAddressInput): Promise<Address> {
    const addressCreated = await prisma.address.create({
      data: {
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        org: {
          connect: {
            id: address.orgId,
          },
        },
      },
    })

    return {
      ...addressCreated,
      orgId: addressCreated.org_id,
      createdAt: addressCreated.created_at,
      updatedAt: addressCreated.updated_at,
      deletedAt: addressCreated.deleted_at,
    }
  }

  async findByOrgId(id: string): Promise<Address> {
    const address = await prisma.address.findUniqueOrThrow({
      where: {
        org_id: id,
      },
    })

    return {
      ...address,
      orgId: address.org_id,
      createdAt: address.created_at,
      updatedAt: address.updated_at,
      deletedAt: address.deleted_at,
    }
  }
}
