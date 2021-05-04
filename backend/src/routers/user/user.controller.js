export class UserController {
  constructor(db) {
    this.db = db
    this.getInfo = this.getInfo.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  async getInfo(req, reply) {
    const { user: { id } } = req
    const user = (await this.db.collection('users').find({ id: { $eq: id } }).toArray())[0]
    const { password, ...publicData } = user
    return reply.code(200).send(publicData)
  }

  async updateUser(req, reply) {
    const { body, user: { id } } = req
    await this.db.collection('users').update(
      { id },
      { $set: body }
    )
    return reply.code(200).send({status: 'Ok'})
  }
}
