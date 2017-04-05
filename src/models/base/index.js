var config = require('../../../config');
var knex = require('knex')(config.database);
var orm = require('bookshelf')(knex);

/* Setup our DB connection once here and export to all models to extend */

module.exports = orm;