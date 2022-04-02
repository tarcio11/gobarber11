import { Execute, Response } from '../../../shared/contracts/execute'
import { CreateUserDTO } from '../dtos'
import { UserRepository } from '../repositories/user-repositories'
import { Hasher } from './contracts/hasher'
import { EmailInUseError } from './errors/email-in-use-error'

export class DbCreateUser implements Execute {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (request: CreateUserDTO): Promise<Response> {
    const user = await this.userRepository.findByEmail(request.email)

    if (user) throw new EmailInUseError()

    const hashedPassword = await this.hasher.hash(request.password)

    const account = await this.userRepository.add({ ...request, password: hashedPassword })

    return account
  }
}
