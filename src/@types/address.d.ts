// export interface UpdateAddressInput {
//   id?: string | undefined
//   orgId: string
//   zipcode: string
//   street: string
//   number: string
//   city: string
//   state: string
// }

export interface Address {
  id: string
  orgId: string
  zipcode: string
  street: string
  number: string
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface CreateAddressInput {
  id?: string | undefined
  orgId: string
  zipcode: string
  street: string
  number: string
  city: string
  state: string
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
  deletedAt?: string | Date | undefined
}

interface AddressDatabase {
  id: string
  org_id: string
  zipcode: string
  street: string
  number: string
  city: string
  state: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
