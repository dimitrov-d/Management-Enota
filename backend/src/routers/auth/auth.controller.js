import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../../models/user'

const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class AuthController {
  constructor(db) {
    this.db = db

    this.loginUser = this.loginUser.bind(this)
    this.registerUser = this.registerUser.bind(this)
    // this.logoutUser = this.logoutUser.bind(this)
  }

  async loginUser(req, reply) {
    const { body: { email, password } } = req
    console.log(req.body)
    console.log(email, password)
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

  async registerUser(req, reply) {
    const { body: { email, password } } = req
    if (!email || !password) return sendReply(reply, 400, 'Please enter valid credentials')
    const user = new User(req.body);
    const totalUsers = await this.db.collection('users').countDocuments()
    this.db.collection('users').insertOne({...user, id: totalUsers + 1})
    return reply.code(200).send({status: 'Ok'})
  }

//   async logoutUser(req, reply) {
//   }
}