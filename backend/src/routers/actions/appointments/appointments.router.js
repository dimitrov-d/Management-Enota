import { AppointmentsController } from './appointments.controller'

const appointmentsRouterCreator = db => (fastifyInstance, opts, done) => {
  const appointmentsController = new AppointmentsController(db)

  fastifyInstance.post('/addAppointment', appointmentsController.addApointment)
  done()
}

export default appointmentsRouterCreator
