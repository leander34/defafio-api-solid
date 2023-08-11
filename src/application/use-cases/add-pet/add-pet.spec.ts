import { describe, expect, it } from 'vitest'
import { AddPetUseCase } from '.'
import { InMemoryPetRepository } from '@/infra/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/infra/repositories/in-memory/in-memory-org-repository'
import { InMemoryAddressRepositoy } from '@/infra/repositories/in-memory/in-memory-address-repository'

const makeSut = () => {
  const addressRepository = new InMemoryAddressRepositoy()
  const orgRepository = new InMemoryOrgRepository(addressRepository)
  const petRepository = new InMemoryPetRepository(
    orgRepository,
    addressRepository,
  )
  const sut = new AddPetUseCase(petRepository)
  return {
    sut,
    petRepository,
  }
}

describe('Add Pet Use case', async () => {
  it('it should be able to add a pet', async () => {
    const { sut } = makeSut()
    const { pet } = await sut.execute({
      orgId: 'org-01',
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
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        type: 'dog',
        gender: 'male',
        name: 'Billy',
        about: 'Louco',
        age: 1,
        port: 1,
        energy: 2,
        independence: 1,
        ambience: 1,
        adoptedAt: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
        requirements: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Ter paciencia',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(String),
            requirement: 'Gostar de ficar perto',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: null,
          }),
        ]),
        photos: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: 'brincando',
            url: 'http:localhost:3333/brincando.jpg',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(String),
            name: 'pegando o rabo',
            url: 'http:localhost:3333/pegando_o_rabo.jpg',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: null,
          }),
        ]),
      }),
    )
  })
})
