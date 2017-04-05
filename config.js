var config = {
	'secret': 'ourtokensecret',
	'database': {
		'client': 'mysql',
		'connection': {
			'host': '127.0.0.1',
			'user': 'root',
			'password': 'dbpassword',
			'database': 'dbname',
			'charset': 'utf8'
		}
	}
};

module.exports = config;