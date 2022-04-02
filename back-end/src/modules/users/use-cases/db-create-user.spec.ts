import { CreateUserDTO } from '../dtos'
import { DbCreateUser } from './db-create-user'
import { InMemoryUserRepository } from './in-memory-user-repository/in-memory-user-repository'
import { EmailInUseError } from './errors/email-in-use-error'

import faker from 'faker'
import { Hasher } from './contracts/hasher'

const createUserParams = (): CreateUserDTO => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

class HasherSpy implements Hasher {
  plaintext: string
  response = faker.datatype.uuid()

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.response
  }
}

describe('DbCreateUser use-case', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let sut: DbCreateUser
  let hasherSpy: HasherSpy

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository([])
    hasherSpy = new HasherSpy()
    sut = new DbCreateUser(inMemoryUserRepository, hasherSpy)
  })

  test('Should call findByEmail with correct email', async () => {
    const userParams = createUserParams()
    await sut.execute(userParams)
    expect(inMemoryUserRepository.params.email).toBe(userParams.email)
  })

  test('Should return EmailInUseError if user exists', async () => {
    const userParams = createUserParams()
    await inMemoryUserRepository.add(userParams)
    const promise = sut.execute(userParams)
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should call hash with correct plaintext', async () => {
    const userParams = createUserParams()
    await sut.execute(userParams)
    expect(hasherSpy.plaintext).toBe(userParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const userParams = createUserParams()
    jest.spyOn(hasherSpy, 'hash').mockRejectedValue(new Error())
    const promise = sut.execute(userParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should call add user with correct values', async () => {
    const userParams = createUserParams()
    await sut.execute(userParams)
    expect(inMemoryUserRepository.params).toEqual({
      name: userParams.name,
      email: userParams.email,
      password: hasherSpy.response
    })
  })

  test('Should return user on success', async () => {
    const userParams = createUserParams()
    const user = await sut.execute(userParams)
    const checkUserExists = await inMemoryUserRepository.findByEmail(user.email)
    expect(checkUserExists?.id).toBe(user.id)
  })
})
