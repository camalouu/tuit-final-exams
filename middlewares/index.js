import { MongoClient } from 'mongodb'
import { MONGODB_URI } from '../config.js'

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

const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        console.log(error);
        res.status(400).send({ error: error.message })
    }
    else if (error.name === "MongoServerError") {
        console.log(error.errInfo.details);
        res.status(400).send({ error: error.errInfo })
    }
}

const unknownEndpoint = (req, res) => {
    res.status(404).send("unknown endpoint")
}

export {
    connectToDB,
    errorHandler,
    unknownEndpoint
}