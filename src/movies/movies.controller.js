const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: `Movie cannot be found.` })
}

async function list (req, res, next) {
    const data = await moviesService.list()
    res.json({ data })
}

function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

function isMovieShowing(req, res) {
    const isShowing = res.locals.is_showing
    const { movie: data } = res.locals
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read]
}