import { MongoClient } from 'mongodb'
import { MONGODB_URI } from '../config.js'

const schema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["question"],
        additionalProperties: false,
        properties: {
            question: {
                bsonType: "string",
                maxLength: 300,
                minLength: 5,
                description: "Must be a string and is required"
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
        //await db.createCollection("questions", { validator: schema })
        await db.command({ collMod: "questions", validator: schema })
        req.db = db
        next()
    } catch (error) {
        next(error)
    }

}

export default connectToDB