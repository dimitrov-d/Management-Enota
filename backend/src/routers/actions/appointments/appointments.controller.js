const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class AppointmentsController {
  constructor(db) {
    this.db = db

    this.addApointment = this.addApointment.bind(this)
  }

  async addApointment(req, reply) {
    const { body: { userId, datetime } } = req
    if (!datetime) return sendReply(reply, 400, 'Invalid request')
    this.db.collection('appointments').insert({ userId, datetime})

    return reply.code(200).send({ accessToken })
  }

}
