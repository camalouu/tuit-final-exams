
const errorHandler = (error, req, res, next) => {
    console.log(error.toString());
    res.send({ error: error })
}

export default errorHandler