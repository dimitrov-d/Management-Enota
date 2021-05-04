import verifyUser from '../../middlewares/verifyUser'
import { UserController } from './user.controller'

const userRouterCreator = db => (fastifyInstance, opts, done) => {
  const userController = new UserController(db)

  fastifyInstance.get('/', { preHandler: verifyUser }, userController.getInfo)
  fastifyInstance.post('/update', { preHandler: verifyUser }, userController.updateUser)
  done()
}

export default userRouterCreator
