if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express'),
	http = require('http'),
	https = require('https'),
	passport = require('passport')
	path = require('path')
	morgan = require('morgan')
	bodyParser = require('body-parser')
	methodOverride = require('method-override')
	cookieParser = require('cookie-parser')
	cookieSession = require('cookie-session')
	session = require('express-session')
	csrf = require('csurf'),
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
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));

var env = process.env.NODE_ENV || 'development';
if ('development' === env || 'production' === env) {
    app.use(csrf());
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
}
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Instagram auth
app.get('/auth/instagram', passport.authenticate('instagram'), function(req, res){
	// The request will be redirected to Instagram for authentication, so this
	// function will not be called.
});

app.get('/auth/instagram/callback', passport.authenticate('instagram', {successRedirect: '/#/account', failureRedirect: '/#/login'}), function(req, res) {
	// res.redirect('/');
	// // If auth failed, redirect to login page
	// // passport.authenticate('instagram', function(err, user, info) {
	// //     if (user === false) {
	// //       // handle login error ...
	// //     } else {
	// //       // handle successful login ...
	// //       res.redirect('account')
	// //     }
	// //   })(req, res, next);

	// User = req.user._json.data;
	// // res.send(req.user);
});

app.get('/', function(req, res){
	// fs.readFile(__dirname + '/app/views/index.html', 'utf8', function(err, text){
 //        res.send(text);
 //    });

     if(req.user) {
        user = req.user._json.data;
    
		res.cookie('user', JSON.stringify(user));
	}

    console.log('****************************************Home');
    // console.log(user);
    res.render('home');

});

// route to log in
app.post('/login', function(req, res) {
	passport.authenticate('instagram', function(req, res, next) {
        if(err)     { return next(err); }
        // if(!user)   { return res.send(400); }

        req.logIn(req.user, function(err) {
            if(err) {
                return next(err);
            }
            console.log('****************************************Login');
            console.log(user);
            res.json(200, {"user": user });
        });
    })(req, res, next);
  	// res.send(req.user);
});

// route to log in
app.get('/getFeeds', function(req, res) {
	console.log('Getting user feeds');
	// console.log(Access_Token);
	getInstaFeed(function (json) {
		res.send(json);
	});
	
});


// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

function getInstaFeed(callback) {
	var options = {
			host: 'api.instagram.com',
			path: '/v1/users/self/media/recent?access_token='+ Access_Token
		},
		response = '';

    var req = https.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			// console.log('on data');
			response += chunk ;
		});
		res.on('end', function () {
			// console.log('on end');
			if (callback !== null) {
				callback(response);
			} else {
				console.log('Error: Use callback to receive response');
			}
		});
	});
	req.on('error', function (err) {
        console.log('Error: ' + err.message);
      });
	req.end();
}

var server = http.createServer(app);

server.listen(app.get('port'), function(){
 	console.log("Web server listening in %s on port %d", process.env.NODE_ENV, app.get('port'));
});
