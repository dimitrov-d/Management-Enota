import { pipeline } from 'stream'
import { promisify } from 'util'
import { createWriteStream, unlink, access, constants, mkdir, fstat, readdirSync } from 'fs'

const sendReply = async (reply, code, status) => reply.code(code).send({ code, status })

const pump = promisify(pipeline)

const mkup = promisify(mkdir)
const accuss = promisify(access)
export class ApplicationsController {
  constructor(db) {
    this.db = db

    this.addApplication = this.addApplication.bind(this)
    this.getApplication = this.getApplication.bind(this)
    this.acceptDocument = this.acceptDocument.bind(this)
    this.documents = this.documents.bind(this)
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

  async __createDirIfNotExist (filesPath) {
    try {
      await accuss(filesPath)
    } catch (error) {
      await mkup(filesPath)
    }
  }

  async acceptDocument(req, reply) {
    const { user: { id } } = req
    if (!req.files) return reply.code(400).send('Bad Request, formData is required')
    const filePath = __dirname + `/documents/${id}`

    const parts = await req.files()
    for await (const { file, filename } of parts) {
      const fileInfo = {
        fileName: filename,
        path: `${filePath}/${filename}`,
        textName: filename
      }

      await pump(file, createWriteStream(fileInfo.path))
    }

    reply.send({ status: 'Ok' })
  }

  async documents(req, reply) {
    const { user: { id } } = req
    const filePath = __dirname + `/documents/${id}`
    readdirSync(filePath, (err, files) => {
      if (!files.length || err) return reply.code(404).send({ message: 'No files found' })
      reply.code(200).send(files)
    })
  }

}
