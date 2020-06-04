
exports.up = function(knex) {
  return knex.schema.createTable('user',tbl=>{
      tbl.increments('id');
      tbl.text('Username',250).notNullable();
      tbl.text('Password',250).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
