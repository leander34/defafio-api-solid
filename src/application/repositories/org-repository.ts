import { Address } from '@/@types/address'
import { CreateOrgWithAddressInput, Org } from '@/@types/org'

export interface OrgRepository {
  create(org: CreateOrgWithAddressInput): Promise<Org & { address: Address }>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findByEmailOrWhatsApp({
    email,
    whatsAppPhone,
  }: {
    email: string
    whatsAppPhone: string
  }): Promise<Org | null>

  findManyByCity(city: string): Promise<
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
  >
}
