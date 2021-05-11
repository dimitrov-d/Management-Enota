import { ObjectId } from 'mongodb'
const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

export class AppointmentsController {
  constructor(db) {
    this.db = db

    this.addAppointment = this.addAppointment.bind(this)
    this.getAppointments = this.getAppointments.bind(this)
    this.deleteAppointment = this.deleteAppointment.bind(this)
  }

  async addAppointment(req, reply) {
    const { user: { id } } = req
    const { body: { datetime } } = req
	// console.log('aaaaaaaaaaaaaaaaa ' + JSON.stringify(req))
    if (!datetime) return sendReply(reply, 400, 'Invalid request')
    this.db.collection('appointments').insert({ userId: id, datetime})

    return reply.code(200).send({ status: 'Ok' })
  }

  async getAppointments(req, reply) {
    const { user: { id } } = req
    const applications = await this.db.collection('appointments').find({ userId: { $eq: id } }).toArray()

    return reply.code(200).send(applications)
  }

  async deleteAppointment(req, reply) {
    const { user: { id } } = req
    try {
      await this.db.collection('appointments').remove({ _id: ObjectId(req.body.appId), userId: id })
    } catch(err) {
      console.log(err)
    }
    return reply.code(200).send({ status: 'Ok' })
  }

}
