import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class AuthController {
  constructor(db) {
    this.db = db

    this.loginUser = this.loginUser.bind(this)
    // this.logoutUser = this.logoutUser.bind(this)
  }

  async loginUser(req, reply) {
    const { body: { email, password } } = req

    if (!email || !password) return sendReply(reply, 403, 'Invalid credentials')
    const user = (await this.db.collection('users').find({ email: { $eq: email } }).toArray())[0]
    if (!user) return sendReply(reply, 403, 'User not found')
    if (!(await bcrypt.compare(password, user.password))) {
        return sendReply(reply, 400, 'Password is incorrect')
    }

    const { id, surname, name } = user

    const accessToken = await jwt.sign({ id, surname, name }, process.env.SECRET_TOKEN, { expiresIn: '1d' })
    return reply.code(200).send({ accessToken })
  }

//   async logoutUser(req, reply) {
//   }
}
