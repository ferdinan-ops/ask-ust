/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.createTable("answer_reactions", table => {
      table.increments()
      table.string("id_answer")
      table.string("like")
      table.string("dislike")
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTable("answer_reactions")
};
