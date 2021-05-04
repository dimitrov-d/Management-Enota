import verifyUser from '../../../middlewares/verifyUser'
import { AppointmentsController } from './appointments.controller'

const appointmentsRouterCreator = db => (fastifyInstance, opts, done) => {
  const appointmentsController = new AppointmentsController(db)

  fastifyInstance.get('/', { preHandler: verifyUser }, appointmentsController.getAppointments)
  fastifyInstance.post('/addAppointment', { preHandler: verifyUser }, appointmentsController.addAppointment)
  fastifyInstance.post('/deleteAppointment', { preHandler: verifyUser }, appointmentsController.deleteAppointment)
  done()
}

export default appointmentsRouterCreator
