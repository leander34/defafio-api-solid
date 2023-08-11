/* eslint-disable @typescript-eslint/no-empty-function */
import { Address } from '@/@types/address'
import { CreateOrgWithAddressInput, Org, OrgDatabase } from '@/@types/org'
import { AddressRepository } from '@/application/repositories/address-repository'
import { OrgRepository } from '@/application/repositories/org-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgRepository implements OrgRepository {
  public orgs: OrgDatabase[] = []

  constructor(private addressRepository: AddressRepository) {}
  async findManyByCity(city: string): Promise<
    (Omit<
      Org,
      'passwordHash' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'role'
    > & {
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
    const orgsPromise = this.orgs.map(async (org) => {
      const orgAddress = await this.addressRepository.findByOrgId(org.id)
      return {
        id: org.id,
        name: org.name,
        email: org.email,
        whatsAppPhone: org.whats_app_phone,
        address: {
          id: orgAddress.id,
          street: orgAddress.street,
          number: orgAddress.number,
          city: orgAddress.city,
          state: orgAddress.state,
          zipcode: orgAddress.zipcode,
        },
      }
    })

    const orgs = await Promise.all(orgsPromise)

    return orgs.filter((org) => org.address.city === city)
  }

  async create(
    org: CreateOrgWithAddressInput,
  ): Promise<Org & { address: Address }> {
    const orgId = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    const deletedAt = null
    this.orgs.push({
      id: orgId,
      name: org.name,
      email: org.email,
      password_hash: org.passwordHash,
      whats_app_phone: org.whatsAppPhone,
      role: org.role ?? 'MEMBER',
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
    })
    // criara o address

    const address = await this.addressRepository.create({
      orgId,
      street: org.address.street,
      number: org.address.number,
      city: org.address.city,
      state: org.address.state,
      zipcode: org.address.zipcode,
    })

    return {
      id: orgId,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whatsAppPhone,
      passwordHash: org.passwordHash,
      role: org.role ?? 'MEMBER',
      createdAt,
      updatedAt,
      deletedAt,
      address,
    }
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)
    if (!org) {
      return null
    }
    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      passwordHash: org.password_hash,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.deleted_at,
    }
  }

  async findByEmailOrWhatsApp({
    email,
    whatsAppPhone,
  }: {
    email: string
    whatsAppPhone: string
  }): Promise<Org | null> {
    const org = this.orgs.find(
      (org) => org.email === email || org.whats_app_phone === whatsAppPhone,
    )
    if (!org) {
      return null
    }
    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      passwordHash: org.password_hash,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.deleted_at,
    }
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }
    return {
      id: org.id,
      name: org.name,
      email: org.email,
      whatsAppPhone: org.whats_app_phone,
      passwordHash: org.password_hash,
      role: org.role,
      createdAt: org.created_at,
      updatedAt: org.updated_at,
      deletedAt: org.deleted_at,
    }
  }
}
