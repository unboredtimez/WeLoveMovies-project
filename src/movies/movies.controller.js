const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// Checks if movie_id exists in Database
async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ 
        status: 404, 
        message: `Movie cannot be found.` 
    })
}

// List all movies in database and check for is_showing query
async function list(req, res, next) {
    const isShowing = req.query.is_showing
    
    if (!(isShowing)) 
        return res.json({ data: await moviesService.list() })
    
    const data = await moviesService.listShowing()
    res.json({ data })
        
}

// Display a specific movie via movie_id
function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

// Check what theaters the movie is playing in via movie_id
async function readTheaters(req, res, next) {
    const data = await moviesService.readTheaters(res.locals.movie.movie_id)
    res.json({ data })
}

// read reviews for a specific movie 
async function readReviews(req, res, next) {
    const data = await moviesService.readReviews(res.locals.movie.movie_id)
    res.json({ data })
}

module.exports = {
    list: [
        asyncErrorBoundary(list)
    ],
    read: [
        asyncErrorBoundary(movieExists), 
        read
    ],
    readTheaters: [
        asyncErrorBoundary(movieExists), 
        readTheaters
    ],
    readReviews: [
        asyncErrorBoundary(movieExists), 
        readReviews
    ],
}