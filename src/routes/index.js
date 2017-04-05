var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var verify = require('../middleware/authentication');

var router = express.Router();

/* GET api root */
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our basic API' });
});

/* POST authentication request */
router.post('/authenticate', function(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	if(!username || !password) {
		// Required field(s) missing
		res.json({
			success: false,
			message: 'One or more required parameters missing'
		});
	} else {
		User.where('username', username).fetch().then(function(user) {
			if(user) {
				/* 
					NOTE: The password comparison here is oversimplified for the sake of the example.
					We should be using some form of password hashing in production.
				*/ 
				if(user.get('password') === password) {
					// User with matching password exists, create and return token containing reference to user
					var token = jwt.sign({
						user: user.get('username')
					}, req.app.settings.tokenSecret, {
						expiresIn: '24h'
					}, function(err, token) {
						if(err) {
							throw err;
						} else {
							res.json({
								success: true,
								message: 'Authentication successful',
								token: token
							});
						}
					});					
				} else {
					throw 'Password incorrect';
				}
			} else {
				throw 'Problem finding requested user';
			}
		}).catch(function(err) {
			// Single failure response, dont provide unnecessary clues 
			res.status(401);
			res.setHeader('WWW-Authenticate', 'Bearer realm="MyRealmName"');
			res.json({ 
				success: false,
				message: 'Unable to authenticate' 
			});
		});
	}

});

/* All requests after this middleware will require a token */
router.use(function(req, res, next) {
	verify(req, res, next);
});

/* Simple GET to test authentication is working */
router.get('/test', function(req, res) {
  res.json({ message: 'If you are seeing this without authenticating first, something went wrong' });
});

module.exports = router;
