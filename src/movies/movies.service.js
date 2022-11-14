const knex = require("../db/connection")

function list() {
    return knex("movies").select("*")
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movie_id })
        .first()
}

function isMovieShowing(is_showing) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({ "is_showing": is_showing })
}

module.exports = {
    list,
    read,
    isMovieShowing,
}