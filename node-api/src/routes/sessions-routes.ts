import { Router } from 'express'
import { AuthenticateUserService } from '../services/authenticate-user-service'

export const sessionsRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUserService = new AuthenticateUserService()

  const { user, token } = await authenticateUserService.execute({ email, password })

  delete user.password

  return response.json({ user, token })
})
