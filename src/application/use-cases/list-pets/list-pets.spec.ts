import { describe, expect, it } from 'vitest'
import { ListPetsUseCase } from '.'
import { InMemoryPetRepository } from '@/infra/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/infra/repositories/in-memory/in-memory-org-repository'
import { InMemoryAddressRepositoy } from '@/infra/repositories/in-memory/in-memory-address-repository'
import { hash } from 'bcryptjs'

const makeSut = () => {
  const addressRepository = new InMemoryAddressRepositoy()
  const orgRepository = new InMemoryOrgRepository(addressRepository)
  const petRepository = new InMemoryPetRepository(
    orgRepository,
    addressRepository,
  )
  const sut = new ListPetsUseCase(petRepository)

  return {
    addressRepository,
    orgRepository,
    petRepository,
    sut,
  }
}
describe('List Pets Use Case', () => {
  it('should be able to list pets by city', async () => {
    const { sut, petRepository, orgRepository } = makeSut()

    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })

    const org2 = await orgRepository.create({
      name: 'Cats.com',
      email: 'johndoe2@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos gatos',
        number: '12',
        city: 'cats',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    await petRepository.add({
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
    await petRepository.add({
      orgId: org2.id,
      type: 'cat',
      gender: 'female',
      name: 'Nina',
      about: 'Folgada',
      age: 1,
      port: 1,
      energy: 1,
      independence: 1,
      ambience: 1,
      photos: [
        { name: 'Dormindo', url: 'http:localhost:3333/dormindo.jpg' },
        {
          name: 'deitada',
          url: 'http:localhost:3333/deitada.jpg',
        },
      ],
      requirements: [
        { requirement: 'Ter lugar pra dormir' },
        { requirement: 'Gostar de ficar perto' },
      ],
    })
    const { pets, petsCount } = await sut.execute({
      city: 'dogs',
      type: null,
      gender: null,
      age: null,
      energy: null,
      port: null,
      independence: null,
      ambience: null,
      page: 1,
    })

    expect(pets).toEqual([
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
        photo: expect.objectContaining({
          id: expect.any(String),
          url: 'http:localhost:3333/brincando.jpg',
        }),
        org: expect.objectContaining({
          id: expect.any(String),
          name: 'Cachorros.com',
          email: 'johndoe@exemplo.com',
          whatsAppPhone: '35987135068',
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
    ])

    expect(petsCount).toEqual(1)
  })

  it('should bring an empty array if there are no pets in the city or orgs', async () => {
    const { sut, petRepository, orgRepository } = makeSut()

    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })

    const org2 = await orgRepository.create({
      name: 'Cats.com',
      email: 'johndoe2@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos gatos',
        number: '12',
        city: 'cats',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    await petRepository.add({
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
    await petRepository.add({
      orgId: org2.id,
      type: 'cat',
      gender: 'female',
      name: 'Nina',
      about: 'Folgada',
      age: 1,
      port: 1,
      energy: 1,
      independence: 1,
      ambience: 1,
      photos: [
        { name: 'Dormindo', url: 'http:localhost:3333/dormindo.jpg' },
        {
          name: 'deitada',
          url: 'http:localhost:3333/deitada.jpg',
        },
      ],
      requirements: [
        { requirement: 'Ter lugar pra dormir' },
        { requirement: 'Gostar de ficar perto' },
      ],
    })
    const { pets, petsCount } = await sut.execute({
      city: 'non-existent city',
      type: null,
      gender: null,
      age: null,
      energy: null,
      port: null,
      independence: null,
      ambience: null,
      page: 1,
    })

    expect(pets).toEqual([])
    expect(pets).toHaveLength(0)

    expect(petsCount).toEqual(0)
  })

  it('should be able to list pets by age', async () => {
    const { sut, orgRepository, petRepository } = makeSut()
    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    await petRepository.add({
      orgId: org.id,
      type: 'dog',
      gender: 'male',
      name: 'Billy',
      about: 'Louco',
      age: 3,
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
    await petRepository.add({
      orgId: org.id,
      type: 'cat',
      gender: 'female',
      name: 'Nina',
      about: 'Folgada',
      age: 1,
      port: 1,
      energy: 1,
      independence: 1,
      ambience: 1,
      photos: [
        { name: 'Dormindo', url: 'http:localhost:3333/dormindo.jpg' },
        {
          name: 'deitada',
          url: 'http:localhost:3333/deitada.jpg',
        },
      ],
      requirements: [
        { requirement: 'Ter lugar pra dormir' },
        { requirement: 'Gostar de ficar perto' },
      ],
    })

    const { petsCount } = await sut.execute({
      city: 'dogs',
      type: null,
      gender: null,
      age: 1,
      energy: null,
      port: null,
      independence: null,
      ambience: null,
      page: 1,
    })

    expect(petsCount).toEqual(1)
  })

  it('should be able to list pets with all filters', async () => {
    const { sut, orgRepository, petRepository } = makeSut()
    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    await petRepository.add({
      orgId: org.id,
      type: 'dog',
      gender: 'male',
      name: 'Billy',
      about: 'Louco',
      age: 3,
      port: 2,
      energy: 2,
      independence: 2,
      ambience: 2,
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
    await petRepository.add({
      orgId: org.id,
      type: 'dog',
      gender: 'male',
      name: 'Mel',
      about: 'medroza',
      age: 3,
      port: 1,
      energy: 1,
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
    await petRepository.add({
      orgId: org.id,
      type: 'cat',
      gender: 'female',
      name: 'Nina',
      about: 'Folgada',
      age: 1,
      port: 1,
      energy: 1,
      independence: 1,
      ambience: 1,
      photos: [
        { name: 'Dormindo', url: 'http:localhost:3333/dormindo.jpg' },
        {
          name: 'deitada',
          url: 'http:localhost:3333/deitada.jpg',
        },
      ],
      requirements: [
        { requirement: 'Ter lugar pra dormir' },
        { requirement: 'Gostar de ficar perto' },
      ],
    })

    const { petsCount } = await sut.execute({
      city: 'dogs',
      type: 'dog',
      gender: null,
      age: 3,
      port: 2,
      energy: 2,
      independence: 2,
      ambience: 2,
      page: 1,
    })

    expect(petsCount).toEqual(1)
  })

  it('should be able to list pets with pagination', async () => {
    const { sut, orgRepository, petRepository } = makeSut()
    const org = await orgRepository.create({
      name: 'Cachorros.com',
      email: 'johndoe@exemplo.com',
      whatsAppPhone: '35987135068',
      passwordHash: await hash('123456', 6),
      role: 'ADMIN',
      address: {
        street: 'Rua dos cachorros',
        number: '1000',
        city: 'dogs',
        state: 'MG',
        zipcode: '37900542',
      },
    })
    for (let i = 1; i <= 22; i++) {
      await petRepository.add({
        orgId: org.id,
        type: 'dog',
        gender: 'female',
        name: `dog-${i}`,
        about: 'medroza',
        age: 3,
        port: 1,
        energy: 1,
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
    }
    const { pets } = await sut.execute({
      city: 'dogs',
      type: 'dog',
      gender: null,
      age: null,
      port: null,
      energy: null,
      independence: null,
      ambience: null,
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'dog-21',
      }),
      expect.objectContaining({
        name: 'dog-22',
      }),
    ])
  })
})
