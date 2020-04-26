exports.up = async knex => knex.schema.createTable(
  'countries',
  (table) => {
    table.string('code').primary();
    table.string('name').notNullable().unique();
    table.timestamps(false, true);
  },
);

exports.down = async knex => knex.schema.dropTable('countries');
