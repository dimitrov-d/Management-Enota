import fastify from 'fastify'
import { authRouterCreator } from './routers'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

const path = `${process.cwd()}/.env`
dotenv.config({ path })

const bootup = async () => {
    const app = fastify({ logger: true, bodyLimit: 1024 * 1024 * 100 })
    const uri = "mongodb+srv://enota:12345@cluster0.yjvvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err => {
        if (err) throw new Error(err)
        const db = client.db('enota')
        const authRouter = authRouterCreator(db)
        app.register(authRouter, { prefix: '/auth' })
        
        app.listen(3123, async (err, address) => {
            if (err) {
              console.error(err)
              process.exit(1)
            }
            console.log(`Server listening on ${address}`)
        })
    })
}

bootup()