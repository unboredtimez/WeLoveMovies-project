
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary() // Unique ID for the review
    table.text("content") // The content of the review, written in markdown
    table.integer("score") // A numerical representation of the score given to the movie by the critic
    table.integer("critic_id").unsigned().notNullable() // Creating critic_id 
    table // FK for critic_id
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("cascade")
    table.integer("movie_id").unsigned().notNullable() // Creating movie_id
    table // FK for movie_id
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("cascade")
    table.timestamps(true, true) // Adds created_at and updated_at columns
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews") // Drops the reviews table
};
