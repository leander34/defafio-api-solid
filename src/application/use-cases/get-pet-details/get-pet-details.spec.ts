import { describe, it, expect } from 'vitest'
import { GetPetDetailsUseCase } from '.'
import { InMemoryPetRepository } from '@/infra/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/infra/repositories/in-memory/in-memory-org-repository'
import { InMemoryAddressRepositoy } from '@/infra/repositories/in-memory/in-memory-address-repository'
import { hash } from 'bcryptjs'
import { PetNotFound } from '@/application/errors/pet-not-found'

const makeSut = () => {
  const addressRepository = new InMemoryAddressRepositoy()
  const orgRepository = new InMemoryOrgRepository(addressRepository)
  const petRepository = new InMemoryPetRepository(
    orgRepository,
    addressRepository,
  )
  const sut = new GetPetDetailsUseCase(petRepository)

  return {
    sut,
    petRepository,
    orgRepository,
    addressRepository,
  }
}
describe('Get Pet Details Use Case', () => {
  it('should be able to get details about a specific pet', async () => {
    const { sut, petRepository, orgRepository } = makeSut()
    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    const createdPet = await petRepository.add({
      orgId: org.id,
      type: 'dog',
      gender: 'male',
      name: 'Billy',
      about: 'Louco',
      age: 1,
      port: 1,
      energy: 2,
      independence: 1,
      ambience: 1,
      photos: [
        { name: 'brincando', url: 'http:localhost:3333/brincando.jpg' },
        {
          name: 'pegando o rabo',
          url: 'http:localhost:3333/pegando_o_rabo.jpg',
        },
      ],
      requirements: [
        { requirement: 'Ter paciencia' },
        { requirement: 'Gostar de ficar perto' },
      ],
    })

    const { pet } = await sut.execute({ id: createdPet.id })
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        orgId: expect.any(String),
        type: 'dog',
        gender: 'male',
        name: 'Billy',
        age: 1,
        energy: 2,
        port: 1,
        independence: 1,
        ambience: 1,
        createdAt: expect.any(Date),
        photos: [
          expect.objectContaining({
            id: expect.any(String),
            url: 'http:localhost:3333/brincando.jpg',
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: 'http:localhost:3333/pegando_o_rabo.jpg',
          }),
        ],
        requirements: [
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Ter paciencia',
          }),
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Gostar de ficar perto',
          }),
        ],
        org: expect.objectContaining({
          id: expect.any(String),
          name: 'Cachorros.com',
          email: 'johndoe@exemplo.com',
          whatsAppPhone: '35987135068',
          createdAt: expect.any(Date),
          address: expect.objectContaining({
            id: expect.any(String),
            street: 'Rua dos cachorros',
            number: '1000',
            city: 'dogs',
            state: 'MG',
            zipcode: '37900542',
          }),
        }),
      }),
    )

    expect(1).toBe(1)
  })
  it('should not be able to get details about a specific pet with a invalid id', async () => {
    const { sut } = makeSut()

    await expect(() =>
      sut.execute({ id: 'non-existent-pet' }),
    ).rejects.toBeInstanceOf(PetNotFound)
  })
})
