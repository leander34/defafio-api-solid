import { describe, expect, it } from 'vitest'
import { RegisterOrgUSeCase } from '.'
import { InMemoryOrgRepository } from '@/infra/repositories/in-memory/in-memory-org-repository'
import { ExistsOrgWithTheSameEmailOrWhatsAppError } from '@/application/errors/exists-org-with-the-same-email-or-whats-app-error'
import { compare } from 'bcryptjs'
import { InMemoryAddressRepositoy } from '@/infra/repositories/in-memory/in-memory-address-repository'

const makeSut = () => {
  const addressRepository = new InMemoryAddressRepositoy()
  const orgRepository = new InMemoryOrgRepository(addressRepository)
  const sut = new RegisterOrgUSeCase(orgRepository)
  return {
    sut,
    orgRepository,
  }
}

describe('Register Org Use case', () => {
  it('should be able to register a ORG', async () => {
    const { sut } = makeSut()
    const { org } = await sut.execute({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })
    expect(org.id).toEqual(expect.any(String))
    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Cachorros.com',
        email: 'johndoe@exemplo.com',
        whatsAppPhone: '35987135068',
        role: 'MEMBER',
        address: expect.objectContaining({
          street: 'Rua dos cachorros',
          number: '1000',
          city: 'dogs',
          state: 'MG',
          zipcode: '37900542',
        }),
      }),
    )
  })
  it('should not be able to register a ORG with the same email than other', async () => {
    const { sut } = makeSut()
    await sut.execute({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    await expect(() =>
      sut.execute({
        name: 'Cachorros.com',
        email: 'johndoe@exemplo.com',
        whatsAppPhone: '35987135000',
        password: '123456',
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      }),
    ).rejects.toBeInstanceOf(ExistsOrgWithTheSameEmailOrWhatsAppError)
  })
  it('should not be able to register a ORG with the same whatsApp phone than other', async () => {
    const { sut } = makeSut()
    await sut.execute({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    await expect(() =>
      sut.execute({
        name: 'Cachorros.com',
        email: 'johndoe2@exemplo.com',
        whatsAppPhone: '35987135068',
        password: '123456',
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      }),
    ).rejects.toBeInstanceOf(ExistsOrgWithTheSameEmailOrWhatsAppError)
  })
  it('should not be able to register a ORG with the same email and whatsApp phone than other', async () => {
    const { sut } = makeSut()
    await sut.execute({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    await expect(() =>
      sut.execute({
        name: 'Cachorros.com',
        email: 'johndoe@exemplo.com',
        whatsAppPhone: '35987135068',
        password: '123456',
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      }),
    ).rejects.toBeInstanceOf(ExistsOrgWithTheSameEmailOrWhatsAppError)
  })

  it('should hash user password upon registration', async () => {
    const { sut } = makeSut()
    const { org } = await sut.execute({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      password: '123456',
      street: 'Rua dos cachorros',
      number: '1000',
      city: 'dogs',
      state: 'MG',
      zipcode: '37900542',
    })

    const isPasswordCorrentlyHashed = await compare('123456', org.passwordHash)
    expect(isPasswordCorrentlyHashed).toBeTruthy()
  })
})
