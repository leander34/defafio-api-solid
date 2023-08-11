// /* eslint-disable @typescript-eslint/no-empty-function */
// import { CreateOrgWithAddressInput, Org } from '@/@types/interfaces'
// import { OrgRepository } from '@/application/repositories/org-repository'
// import { randomUUID } from 'crypto'
// interface AddressDatabase {
//   id: string
//   org_id: string
//   zipcode: string
//   street: string
//   number: string
//   city: string
//   state: string
// }

// interface OrgDatabase {
//   id: string
//   name: string
//   email: string
//   password_hash: string
//   whats_app_phone: string
//   created_at: Date
// }

// export class InMemoryOrgRepository implements OrgRepository {
//   static instance: InMemoryOrgRepository
//   public orgs: OrgDatabase[] = []
//   public address: AddressDatabase[] = []
//   private constructor() {}

//   static getInstance() {
//     if (!InMemoryOrgRepository.instance) {
//       InMemoryOrgRepository.instance = new InMemoryOrgRepository()
//     }
//     return InMemoryOrgRepository.instance
//   }

//   async create(org: CreateOrgWithAddressInput): Promise<Org> {
//     const orgId = randomUUID()
//     const createdAt = new Date()
//     this.orgs.push({
//       id: orgId,
//       name: org.name,
//       email: org.name,
//       created_at: createdAt,
//       password_hash: org.passwordHash,
//       whats_app_phone: org.whatsAppPhone,
//     })
//     this.address.push({
//       id: randomUUID(),
//       org_id: orgId,
//       street: org.address.city,
//       number: org.address.city,
//       city: org.address.city,
//       state: org.address.city,
//       zipcode: org.address.zipcode,
//     })
//     return {
//       id: orgId,
//       name: org.name,
//       email: org.email,
//       whatsAppPhone: org.whatsAppPhone,
//       passwordHash: org.passwordHash,
//       createdAt,
//     }
//   }

//   async findByEmailOrWhatsApp({
//     email,
//     whatsAppPhone,
//   }: {
//     email: string
//     whatsAppPhone: string
//   }): Promise<Org | null> {
//     const org = this.orgs.find(
//       (org) =>
//         org.email.toLowerCase() === email.toLowerCase() ||
//         org.whats_app_phone === whatsAppPhone,
//     )
//     if (!org) {
//       return null
//     }
//     return {
//       id: org.id,
//       name: org.name,
//       createdAt: org.created_at,
//       email: org.email,
//       whatsAppPhone: org.whats_app_phone,
//       passwordHash: org.password_hash,
//     }
//   }
// }
