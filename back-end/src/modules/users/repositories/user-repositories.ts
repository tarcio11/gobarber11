import { CreateUserDTO } from '../dtos'
import { User } from '../infra/typeorm/entities'

export interface UserRepository {
  add: (user: CreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User | undefined>
}
