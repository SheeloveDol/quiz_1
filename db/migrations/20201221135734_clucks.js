
exports.up = function(knex) {
    return knex.schema.createTable('clucks', table => {
        table.increments('id');
        table.string('username');
        table.text('content');
        table.string('image_url');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clucks');
};
