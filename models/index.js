import { object, string, array, number } from 'yup';
import { ObjectID } from 'bson';

const questionSchema = object({
    question: string().min(5).required(),
    answers: array().length(4).required(),
    correct: number().min(0).max(3).required()
});

const customAnswersValidator = answers =>
    (
        Object.keys(answers).every(ques => ObjectID.isValid(ques)) &&
        Object.values(answers).every(answ => typeof answ === 'number' && answ >= 0 && answ <= 3)
    ) ? answers : false

const answersSchema = object({
    answers: object()
})

const answerSchema = object({
    questionId: string().required(),
    answer: number().min(0).max(3).required()
})

export {
    questionSchema,
    answersSchema,
    answerSchema
}



