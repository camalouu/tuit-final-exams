import { Router } from "express"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const questions = req.db.collection('questions')
        //const qs = await questions.findOne({ queion: "sometestingquestion bla bna " })
        const qs = { question: "someqs", istrue: "no" }
        const responsefromcreateingquestion =
            await questions.insertOne(qs)
        console.log(responsefromcreateingquestion)
        res.send(responsefromcreateingquestion)
    } catch (error) {
        next(error)
    }

})

export default router
