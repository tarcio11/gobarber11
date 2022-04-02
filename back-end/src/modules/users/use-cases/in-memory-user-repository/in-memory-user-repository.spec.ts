import { InMemoryUserRepository } from './in-memory-user-repository'
import { User } from '../../infra/typeorm/entities'

import faker from 'faker'

const mockAddUserParams = (): User => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent()
})

describe('InMemoryUserRepository', () => {
  test('Should return user if user is found', async () => {
    const sut = new InMemoryUserRepository([])
    const user = await sut.add(mockAddUserParams())
    const checkUserExists = await sut.findByEmail(user.email)
    expect(checkUserExists).toEqual(user)
  })
})
