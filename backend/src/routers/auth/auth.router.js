import { AuthController } from './auth.controller'

const authRouterCreator = db => (fastifyInstance, opts, done) => {
  const authController = new AuthController(db)

  fastifyInstance.post('/login', authController.loginUser)
  done()
}

export default authRouterCreator
