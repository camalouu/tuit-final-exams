import database from '../utils/dbConnection.js'

const connectToDB = (req, res, next) => {
    if (database) {
        req.db = database
        next()
    } else {
        next(new Error("database not found"))
    }
}

const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        console.log(error);
        res.status(400).send({ error: error.message })
    }
    else if (error.name === "MongoServerError") {
        console.log(error.errInfo.details);
        res.status(500).send({ error: error.errInfo })
    } else {
        console.log(error.message)
        res.status(500).send({ error: "something bad happened" })
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