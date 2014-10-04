if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express'),
	passport = require('passport'),
	http = require('http'),
	https = require('https'),
	fs = require('fs'),
	path = require('path'),
	InstagramStrategy = require('passport-instagram').Strategy;

// Instagram App id and secret
var INSTAGRAM_CLIENT_ID = "4a8127b4705b43f9855ab536f1967f99"
var INSTAGRAM_CLIENT_SECRET = "8f3773ef0838425799939cd142af64bd";
var Access_Token = "";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new InstagramStrategy({
		clientID: INSTAGRAM_CLIENT_ID,
		clientSecret: INSTAGRAM_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/instagram/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			// return the instagram user profile object
			Access_Token = accessToken;
      		return done(null, profile);
    	});
	}
));


var app = express();

// configure Express
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.set('views', __dirname + '/app/views');
	app.set('view engine', 'jade');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	// app.use(express.static(__dirname + 'app'));
	app.use(express.static(path.join(__dirname, 'app')));
});


app.get('/', function(req, res){
	// fs.readFile(__dirname + '/app/views/index.html', 'utf8', function(err, text){
 //        res.send(text);
 //    });
	res.render('home');
});

// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('instagram'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

// Instagram auth
app.get('/auth/instagram', passport.authenticate('instagram'), function(req, res){
	// The request will be redirected to Instagram for authentication, so this
	// function will not be called.
});

app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/#login' }), function(req, res) {
	// If auth failed, redirect to login page
	// res.redirect('/#account');
	console.log(req.user);
	res.send(req.user);
});

var server = http.createServer(app);

server.listen(app.get('port'), function(){
 	console.log("Web server listening in %s on port %d", process.env.NODE_ENV, app.get('port'));
});
