/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateAddressInput, Address, AddressDatabase } from '@/@types/address'
import { AddressRepository } from '@/application/repositories/address-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressRepositoy implements AddressRepository {
  public addresses: AddressDatabase[] = []
  async create(address: CreateAddressInput): Promise<Address> {
    const addressId = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    const deletedAt = null
    const createdAddress: AddressDatabase = {
      id: addressId,
      org_id: address.orgId,
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
    }

    this.addresses.push(createdAddress)
    return {
      ...address,
      id: addressId,
      createdAt,
      updatedAt,
      deletedAt,
    }
  }

  async findByOrgId(id: string): Promise<Address> {
    const orgAddress = this.addresses.find((address) => address.org_id === id)!

    return {
      id: orgAddress.id,
      orgId: orgAddress.org_id,
      street: orgAddress.street,
      number: orgAddress.number,
      city: orgAddress.city,
      state: orgAddress.state,
      zipcode: orgAddress.zipcode,
      createdAt: orgAddress.created_at,
      updatedAt: orgAddress.updated_at,
      deletedAt: orgAddress.deleted_at,
    }
  }
}
