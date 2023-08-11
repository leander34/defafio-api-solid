import { AuthenticateUseCase } from '@/application/use-cases/authenticate'
import { PrismaOrgRepository } from '@/infra/repositories/prisma/prisma-org-repository'

export function makeAuthenticateFactory() {
  const orgRepository = new PrismaOrgRepository()
  const authenticate = new AuthenticateUseCase(orgRepository)
  return authenticate
}
