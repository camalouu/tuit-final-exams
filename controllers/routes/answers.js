import { answerSchema, answersSchema } from "../../models/index.js"
import { ObjectId } from 'mongodb'

const getAnswersAndCheck = async (req, res, next) => {
    const subject = req.params.subject
    const collection = req.db.collection(subject)
    try {
        const answers =
            await answersSchema.validate(req.body.answers)

        const idsOfAnsweredQuestions =
            Object.keys(answers).map(questionId => ObjectId(questionId))

        const questions =
            await collection.find(
                { _id: { $in: idsOfAnsweredQuestions } }
            ).toArray()

        /// object keys are id's of answered questions and values are correctness of them
        const checked =
            questions.reduce(
                (init, q) => ({ ...init, [q._id]: answers[q._id] === q.correct }), {})

        res.status(200).send({ checked })
    } catch (error) {
        next(error)
    }
}

const getOneAnswerAndCheck = async (req, res, next) => {
    const subject = req.params.subject
    const collection = req.db.collection(subject)
    try {
        const answer = await answerSchema.validate(req.body.answer)
        const question = await collection.findOne({ _id: ObjectId(answer.questionId) })
        const isCorrect = question.correct === answer.answer
        res.status(200).send({ answer: isCorrect })
    } catch (error) {
        next(error)
    }
}


export {
    getAnswersAndCheck,
    getOneAnswerAndCheck
}