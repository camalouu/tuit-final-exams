
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

export default errorHandler