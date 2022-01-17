import { Router } from "express"
import { getAnswersAndCheck } from "./routes/answers.js"
import { addNewQuestions, getRandomQuestions } from "./routes/questions.js"

const router = Router()

router.post('/questions/:subject', addNewQuestions)
router.get('/questions/:subject', getRandomQuestions)
router.post('/answers/:subject', getAnswersAndCheck)

export default router


