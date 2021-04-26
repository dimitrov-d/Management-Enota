import { ApplicationsController } from './applications.controller'

const applicationsRouterCreator = db => (fastifyInstance, opts, done) => {
  const applicationsController = new ApplicationsController(db)

  fastifyInstance.post('/addApplication', applicationsController.addApplication)
  done()
}

export default applicationsRouterCreator
