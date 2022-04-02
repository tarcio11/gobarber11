import { CreateUserDTO } from '../../dtos'
import { User } from '../../infra/typeorm/entities'
import { UserRepository } from '../../repositories/user-repositories'

import faker from 'faker'

export class InMemoryUserRepository implements UserRepository {
  email: string
  params: CreateUserDTO
  constructor (private readonly users: User[]) {}

  async findByEmail (email: string): Promise<User | undefined> {
    this.email = email
    return this.users.find(user => user.email === email)
  }

  async add (userData: CreateUserDTO): Promise<User> {
    this.params = userData
    const user = new User()

    Object.assign(user, { id: faker.datatype.uuid(), created_at: faker.date.recent(), updated_at: faker.date.recent() }, userData)

    this.users.push(user)

    return user
  }
}
