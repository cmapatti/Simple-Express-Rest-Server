var orm = require('./base');

/* Define our basic User model */
var User = orm.Model.extend({
	tableName: 'users'
});

module.exports = User;