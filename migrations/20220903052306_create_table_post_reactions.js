/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.createTable("post_reactions", table => {
      table.increments()
      table.string("id_post")
      table.string("like")
      table.string("dislike")
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTable("post_reactions")
};
