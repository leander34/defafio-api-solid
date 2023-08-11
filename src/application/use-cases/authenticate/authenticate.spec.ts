import { describe, it, expect } from 'vitest'
import { AuthenticateUseCase } from '.'
import { InMemoryOrgRepository } from '@/infra/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from '@/application/errors/invalid-credentials'
import { InMemoryAddressRepositoy } from '@/infra/repositories/in-memory/in-memory-address-repository'

const makeSut = () => {
  const addressRepository = new InMemoryAddressRepositoy()
  const orgRepository = new InMemoryOrgRepository(addressRepository)
  const sut = new AuthenticateUseCase(orgRepository)
  return {
    sut,
    orgRepository,
  }
}

describe('Authenticate Use Case', () => {
  it('should to able to autheticate', async () => {
    const { sut, orgRepository } = makeSut()
    await orgRepository.create({
      name: 'Cachorro.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '035987135068',
      passwordHash: await hash('123456', 6),
      address: {
        street: 'Rua',
        number: '00',
        city: 'cidade 01',
        state: 'state 01',
        zipcode: '983598',
      },
    })

    const { org } = await sut.execute({
      email: 'johndoe@exemplo.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to autheticate with a non-existent email', async () => {
    const { sut } = makeSut()
    await expect(() =>
      sut.execute({
        email: 'johndoe@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('should not be able to authenticate with a invalid password', async () => {
    const { sut, orgRepository } = makeSut()

    await orgRepository.create({
      name: 'Cachorro.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '035987135068',
      passwordHash: await hash('123456', 6),
      address: {
        street: 'Rua',
        number: '00',
        city: 'cidade 01',
        state: 'state 01',
        zipcode: '983598',
      },
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@exemplo.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
