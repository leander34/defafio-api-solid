import { Org } from '@prisma/client'

export interface Org {
  id: string
  name: string
  email: string
  passwordHash: string
  whatsAppPhone: string
  role: 'ADMIN' | 'MEMBER'
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface CreateOrgWithAddressInput {
  id?: string | undefined
  name: string
  email: string
  passwordHash: string
  whatsAppPhone: string
  role?: 'ADMIN' | 'MEMBER'
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
  deletedAt?: string | Date | undefined
  address: {
    id?: string | undefined
    zipcode: string
    street: string
    number: string
    city: string
    state: string
    createdAt?: string | Date | undefined
    updatedAt?: string | Date | undefined
    deletedAt?: string | Date | undefined
  }
}

interface OrgDatabase {
  id: string
  name: string
  email: string
  password_hash: string
  whats_app_phone: string
  role: 'ADMIN' | 'MEMBER'
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
