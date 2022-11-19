const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

const reduceCritics = reduceProperties("critic_id", {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    created_at: ["critic", "created_at"],
    updated_at: ["critic", "updated_at"],
})

// List all movies in Database
function list() {
    return knex("movies")
        .select("*")
}

// Read a movie via movie_id from Database
function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movie_id })
        .first()
}

// List all movies that are currently showing in theaters from Database
function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({ "is_showing": true })
}

// Display all theaters showing a specific movie via movie_id
function readTheaters(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": movie_id })
}

// read all respective reviews of a movie via movie_id
function readReviews(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({ "r.movie_id": movie_id })
        .then(reduceCritics)
}

module.exports = {
    list,
    read,
    listShowing,
    readTheaters,
    readReviews,
}