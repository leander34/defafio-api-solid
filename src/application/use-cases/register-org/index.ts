import { Org } from '@/@types/org'
import { ExistsOrgWithTheSameEmailOrWhatsAppError } from '@/application/errors/exists-org-with-the-same-email-or-whats-app-error'
import { OrgRepository } from '@/application/repositories/org-repository'

import { hash } from 'bcryptjs'

interface RegisterOrgUSeCaseRequest {
  name: string
  email: string
  whatsAppPhone: string
  password: string
  street: string
  number: string
  city: string
  state: string
  zipcode: string
}

interface RegisterOrgUSeCaseResponse {
  org: Org
}

export class RegisterOrgUSeCase {
  constructor(private orgRepository: OrgRepository) {}
  async execute(
    data: RegisterOrgUSeCaseRequest,
  ): Promise<RegisterOrgUSeCaseResponse> {
    const { email, whatsAppPhone, password } = data
    const existsSomeOrgWithTheSameEmailOrWhatsApp =
      await this.orgRepository.findByEmailOrWhatsApp({ email, whatsAppPhone })

    if (existsSomeOrgWithTheSameEmailOrWhatsApp) {
      throw new ExistsOrgWithTheSameEmailOrWhatsAppError()
    }
    const passwordHash = await hash(password, 6)
    const org = await this.orgRepository.create({
      email,
      whatsAppPhone,
      name: data.name,
      passwordHash,
      address: {
        street: data.street,
        number: data.number,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
      },
    })

    return {
      org,
    }
  }
}
