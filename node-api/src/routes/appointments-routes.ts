import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import { AppointmentsRepository } from '../repositories/appointments-repository'
import { CreateAppointmentService } from '../services/create-appointment-service'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({ provider_id, date: parsedDate })

  return response.json(appointment)
})
