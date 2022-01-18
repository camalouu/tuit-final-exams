import { MongoClient } from 'mongodb'
import { MONGODB_DATABASE_NAME, MONGODB_URI } from '../config.js'

const database = (async () => {
    try {
        const mongodb_client = new MongoClient(MONGODB_URI)
        await mongodb_client.connect()
        console.log("connected to mongodb. URI:  " + MONGODB_URI)
        return mongodb_client.db(MONGODB_DATABASE_NAME)
    } catch (error) {
        throw new Error(error.message);
    }
})()

export default await database