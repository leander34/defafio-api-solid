import { Address, CreateAddressInput } from '@/@types/address'

export interface AddressRepository {
  create(address: CreateAddressInput): Promise<Address>
  findByOrgId(id: string): Promise<Address>
  //   update(address: UpdateAddressInput): Promise<Address>
}
