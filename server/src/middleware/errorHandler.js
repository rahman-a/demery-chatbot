export const notFound = async(req, res, next) => {
    const error = new Error(`${req.originalUrl} not found`)
    res.status(404)
    next(error)
}

export const errorHandler = async(err, req, res, next) => {
    let error = null;
    for(let key in  err.errors) {
        error = `${err.errors[key].value} is invalid please write a valid ${err.errors[key].path}`
    }
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).send({
        message:error ? error :err.message ,
        stack:process.env.NODE_ENV === 'development' ? err.stack: null
    })
}