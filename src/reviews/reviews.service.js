const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

// Update review with review_id
function update(updatedReview) {
    return knex("reviews as r")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview, "*")
}

// Read review from Database with review_id
function read(review_id) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
        .where({ review_id })
        .first()
        .then(addCritic)
}
// Delete review from Database with review_id
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
}

module.exports = {
    read,
    update,
    destroy,
}