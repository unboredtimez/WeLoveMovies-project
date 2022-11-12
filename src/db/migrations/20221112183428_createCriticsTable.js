
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary() // Sets critic_id as the primary key
    table.string("preferred_name") // The critic's preferred first name
    table.string("surname") // The critic's last name
    table.string("organization_name") // The name of the organization the critic works for
    table.timestamps(true, true) // Adds created_at and updated_at columns
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics") // Drops the critics table
};
