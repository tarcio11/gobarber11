import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserService } from '../services/create-user-service'
import { UpdateUserAvatarService } from '../services/update-user-avatar-service'
import { uploadConfig } from '../config/upload'

export const usersRouter = Router()
const upload = multer(uploadConfig)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUserService = new CreateUserService()

  const user = await createUserService.execute({ name, email, password })

  delete user.password

  return response.json({ user })
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatarService = new UpdateUserAvatarService()

  const user = await updateUserAvatarService.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename
  })

  delete user.password

  return response.json(user)
})
