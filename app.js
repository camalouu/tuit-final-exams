import express from 'express'
import morgan from 'morgan'
import mainRouter from './controllers/index.js'
import { connectToDB, errorHandler, unknownEndpoint } from './middlewares/index.js'

const app = express()
morgan.token('body', req => JSON.stringify(req.body, null, 4));
app.use(morgan(':method :url :status :body'))
app.use(express.json())
app.use(connectToDB)
app.use(mainRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app