import { Router } from "express"
import { getAnswersAndCheck, getOneAnswerAndCheck } from "./routes/answers.js"
import { addNewQuestions, getRandomQuestions } from "./routes/questions.js"
import { getSubjectNames } from "./routes/subjects.js"

const router = Router()

router.post('/questions/:subject', addNewQuestions)
router.get('/questions/:subject', getRandomQuestions)
router.post('/answers/:subject', getAnswersAndCheck)
router.post('/oneAnswer/:subject', getOneAnswerAndCheck)
router.get('/subjects', getSubjectNames)

export default router


