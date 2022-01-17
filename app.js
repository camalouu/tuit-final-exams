import express from 'express'
import morgan from 'morgan'
import questionsRouter from './controllers/questions.js'
import connectToDB from './middlewares/db.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body, null, 4));
app.use(morgan(':method :url :status :body'))
app.use(express.json())
app.use(connectToDB)
app.use('/questions', questionsRouter)
app.use(errorHandler)

app.use((req, res) =>
    res.status(404).send("unknown endpoint")
)

export default app