import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import { Appointment } from '../entities/appointment'
import { AppointmentsRepository } from '../repositories/appointments-repository'
import { AppError } from '../errors/app.error'

interface Request {
  date: Date
  provider_id: string
}

export class CreateAppointmentService {
  public async execute ({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
