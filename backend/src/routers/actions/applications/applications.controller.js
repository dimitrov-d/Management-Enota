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
    const totalApplications = await this.db.collection("applications").countDocuments();
    this.db.collection('applications').insert({ id: totalApplications + 1, userId: id, applicationType, documents})

    return reply.code(200).send({status: 'OK'})
  }

  async deleteApplication(req, reply) {
    const { user: { id }, } = req;
    try {
      await this.db
        .collection("applications")
        .remove({ id: req.body.appId, userId: id });
    } catch (err) {
      console.log(err);
    }
    return reply.code(200).send({ status: "Ok" });
  }

  async getApplication(req, reply) {
    const { user: { id } } = req
    const application = await this.db.collection('applications').find({ userId: { $eq: id } }).toArray()
    return reply.code(200).send(application)
  }

}
