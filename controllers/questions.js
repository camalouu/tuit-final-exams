import { Router } from "express"
import { object, string, array, number } from 'yup';

const router = Router()

const questionSchema = object({
    question: string().min(5).required(),
    answers: array().length(4).required(),
    correct: number().min(3).max(3).required()
});

//for adding new questions
router.post('/:subject', async (req, res, next) => {
    const subject = req.params.subject
    const { question, answers, correct } = req.body
    try {
        const collection = req.db.collection(subject)
        const newQuestion =
            await questionSchema.validate({ question, answers, correct })

        await collection.insertOne(newQuestion)
        res.status(200).send(newQuestion)
    } catch (error) {
        next(error)
    }
})

//getting random number of questions from subject
router.get('/:subject', async (req, res, next) => {
    const subject = req.params.subject
    const numberOfQuestions = Number(req.query.number)
    try {
        const collection = req.db.collection(subject)
        const randQuestions =
            await collection.aggregate([{ $sample: { size: numberOfQuestions } }]).toArray();
        console.log(randQuestions.length);
        res.status(200).send(randQuestions)
    } catch (error) {
        next(error)
    }
})


export default router
