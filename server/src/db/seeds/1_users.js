const bcrypt = require('bcrypt');

exports.seed = async (knex) => {
  await knex('user').del();
  await knex.raw('ALTER SEQUENCE user_id_seq RESTART WITH 1');
  const gardeners = await knex.select().table('gardener');
  return knex('user').insert([
    {
      email: 'guido@email',
      password: bcrypt.hashSync('senha', 10),
      gardener: gardeners[0].id,
    },
    {
      email: 'bruno@email',
      password: bcrypt.hashSync('senha', 10),
      gardener: gardeners[1].id,
    },
  ]);
};
