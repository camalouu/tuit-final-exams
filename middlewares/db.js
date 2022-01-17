import { MongoClient } from 'mongodb'
import { MONGODB_URI } from '../config.js'

export const dbschema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["question", "answers", "correct"],
        additionalProperties: false,
        properties: {
            "_id": {
                bsonType: "objectId"
            },
            question: {
                bsonType: "string",
                maxLength: 300,
                minLength: 5,
                description: "Must be a string and is required"
            },
            answers: {
                bsonType: "array",
                description: "Must be a string and is required"
            },
            correct: {
                bsonType: "number",
                description: "Must be a number and is required"
            }
        }
    },
}

const connectToDB = async (req, res, next) => {
    try {
        const mongodb_client = new MongoClient(MONGODB_URI)
        await mongodb_client.connect()
        console.log("connected to mongo " + MONGODB_URI)
        const db = mongodb_client.db('native-driver')
        req.db = db
        next()
    } catch (error) {
        next(error)
    }

}

export default connectToDB