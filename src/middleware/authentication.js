var jwt = require('jsonwebtoken');

/* Any requests passing through this function must have an authentication token */
var verify = function(req, res, next) {

	// Look for a token anywhere you may expect to find it/want to support
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token, req.app.settings.tokenSecret, function(err, decoded) {
			if(!err) {
				// Place the decoded payload into the request for use later if needed
				req.decoded = decoded;
				next();
			} else {
				res.status(401);
				res.setHeader('WWW-Authenticate', 'Bearer realm="MyRealmName"');
				return res.json({
					success: false,
					message: 'Failed to authenticate request'
				});
			}
		});
	} else {
		res.status(401);
		res.setHeader('WWW-Authenticate', 'Bearer realm="MyRealmName"');
		return res.json({
			success: false,
			message: 'No token found for authentication'
		});
	}

};

module.exports = verify;