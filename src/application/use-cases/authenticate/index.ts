import { InvalidCredentials } from '@/application/errors/invalid-credentials'
import { OrgRepository } from '@/application/repositories/org-repository'
import { compare } from 'bcryptjs'
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
export class AuthenticateUseCase {
  constructor(private orgRepository: OrgRepository) {}
  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentials()
    }

    const isPasswordCorrect = await compare(password, org.passwordHash)

    if (!isPasswordCorrect) {
      throw new InvalidCredentials()
    }

    return {
      org,
    }
  }
}
