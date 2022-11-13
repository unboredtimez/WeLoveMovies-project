
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary() // Unique ID for the theater
    table.string("name").notNullable() // The name of the theater
    table.string("address_line_1") // The first line of the address of the theater
    table.string("address_line_2") // The second line of the address of the theater
    table.string("city") // the city in which the theater is located
    table.string("state") // the state in which the theater is located
    table.string("zip") // The zip in which the theater is located
    table.timestamps(true, true) // Adds created_at and updated_at columns
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("theaters") // drops the theaters table
};
