const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

// reduce theater data and mapping movies to an array property on theater
const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"]
})

// List all theaters with their respective movies in an object
function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*", "m.rating", "m.runtime_in_minutes", "m.title")
        .then(reduceMovies)
}

module.exports = {
    list,
}