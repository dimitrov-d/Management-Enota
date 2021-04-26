const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class ApplicationsController {
  constructor(db) {
    this.db = db

    this.addApplication = this.addApplication.bind(this)
  }

  async addApplication(req, reply) {
    const { body: { userId, applicationType, documents } } = req
    if (!applicationType || !documents) return sendReply(reply, 400, 'Invalid request')
    this.db.collection('applications').insert({ userId, applicationType, documents})

    return reply.code(200).send({ accessToken })
  }

}
