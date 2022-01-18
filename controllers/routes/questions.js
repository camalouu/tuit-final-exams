import { questionSchema } from "../../models/index.js"

const addNewQuestions = async (req, res, next) => {
    const subject = req.params.subject
    const { question, answers, correct } = req.body
    try {
        const collection = req.db.collection(subject)
        const newQuestion =
            await questionSchema.validate({ question, answers, correct }, { strict: true })
        await collection.insertOne(newQuestion)
        return res.status(201).send(newQuestion)
    } catch (error) {
        next(error)
    }
}

const getRandomQuestions = async (req, res, next) => {
    const subject = req.params.subject
    const numberOfQuestions = Number(req.query.number)
    try {
        const collection = req.db.collection(subject)
        const randQuestions =
            await collection
                .aggregate([{ $sample: { size: numberOfQuestions } }])
                .toArray();
        console.log(randQuestions.length);
        return res.status(200).send(randQuestions)
    } catch (error) {
        next(error)
    }
}

export {
    addNewQuestions,
    getRandomQuestions
}