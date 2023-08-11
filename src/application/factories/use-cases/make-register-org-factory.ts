import { RegisterOrgUSeCase } from '@/application/use-cases/register-org'
import { PrismaOrgRepository } from '@/infra/repositories/prisma/prisma-org-repository'

export function makeRegisterOrgFactory() {
  const orgRepository = new PrismaOrgRepository()
  const registerOrg = new RegisterOrgUSeCase(orgRepository)
  return registerOrg
}
