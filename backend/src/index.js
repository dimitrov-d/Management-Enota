import fastify from 'fastify'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import fastifyCors from 'fastify-cors'
import {
    authRouterCreator, 
    applicationsRouterCreator, 
    appointmentsRouterCreator,
    userRouterCreator
} from './routers'

const path = `${process.cwd()}/.env`
dotenv.config({ path })

const bootup = async () =>
{
    const app = fastify({ logger: true, bodyLimit: 1024 * 1024 * 100 })
    const uri = "mongodb+srv://enota:12345@cluster0.yjvvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err =>
    {
        if (err) throw new Error(err)
        const db = client.db('enota')
        const authRouter = authRouterCreator(db)
        const appointmentsRouter = appointmentsRouterCreator(db)
        const applicationsRouter = applicationsRouterCreator(db)
        const userRouter = userRouterCreator(db)
        app.register(fastifyCors, { origin: 'http://localhost:8080' });
        app.register(authRouter, { prefix: '/auth' });
        app.register(appointmentsRouter, { prefix: '/appointments' });
        app.register(applicationsRouter, { prefix: '/applications' });
        app.register(userRouter, { prefix: '/user' });

        app.listen(3123, async (err, address) =>
        {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log(`Server listening on ${address}`)
        })
    })
}

bootup()