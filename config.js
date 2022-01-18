import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME

export {
    PORT,
    MONGODB_URI,
    MONGODB_DATABASE_NAME
}