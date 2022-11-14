
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable()
    table // Foreign key references ID to a particular movie
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("cascade")
    table.integer("theater_id").unsigned().notNullable()
    table // Foreign key references ID to a particular theater
        .foreign("theater_id")
        .references("theater_id")
        .inTable("theaters")
        .onDelete("cascade")
    table.boolean("is_showing").notNullable() // A representation of weather or not the movie is currently showing in the referenced theater
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters") // drops table movies_theaters
};
