import verifyUser from '../../../middlewares/verifyUser'
import { ApplicationsController } from './applications.controller'

const applicationsRouterCreator = db => (fastifyInstance, opts, done) => {
  const applicationsController = new ApplicationsController(db)

  fastifyInstance.post('/addApplication', { preHandler: verifyUser }, applicationsController.addApplication)
  fastifyInstance.post('/getApplication', { preHandler: verifyUser }, applicationsController.getApplication)
  fastifyInstance.put('/acceptDocument', { preHandler: verifyUser }, applicationsController.acceptDocument)
  fastifyInstance.get('/documents', { preHandler: verifyUser }, applicationsController.documents)
  done()
}

export default applicationsRouterCreator
