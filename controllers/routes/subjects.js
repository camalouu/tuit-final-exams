const getSubjectNames = async (req, res, next) => {
    try {
        const collections = await req.db
            .listCollections()
            .toArray()
        const subjects = collections.map(c => c.name)
        res.status(200).send(subjects)
    } catch (error) {
        next(error)
    }
}

export {
    getSubjectNames
}