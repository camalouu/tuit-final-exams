import { object, string, array, number } from 'yup';

const questionSchema = object({
    question: string().min(5).required(),
    answers: array().length(4).required(),
    correct: number().min(3).max(3).required()
});

//needs to be changed
const answersSchema = object({
    answers: object({})
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



