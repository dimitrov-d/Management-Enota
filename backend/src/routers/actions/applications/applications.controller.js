const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class ApplicationsController {
  constructor(db) {
    this.db = db

    this.addApplication = this.addApplication.bind(this)
    this.getApplication = this.getApplication.bind(this)
  }

  async addApplication(req, reply) {
    const { user: { id } } = req
    const { body: { applicationType, documents } } = req
    if (!applicationType || !documents) return sendReply(reply, 400, 'Invalid request')
    this.db.collection('applications').insert({ userId: id, applicationType, documents})

    return reply.code(200).send({status: 'OK'})
  }

  async getApplication(req, reply) {
    const { user: { id } } = req
    const application = await this.db.collection('applications').find({ userId: { $eq: id } }).toArray()
    return reply.code(200).send(application)
  }

}
