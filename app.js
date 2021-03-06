var express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
methodOverride = require('method-override');
avengerRoutes = require('./routes/avenger');
commentRoutes = require('./routes/comment');
authRoutes = require('./routes/auth');
session = require('express-session');

mongodbStore = require('connect-mongodb-session')(session);
expressSession = require('express-session');
User = require('./models/users');
csrf = require('csurf');
flash = require('connect-flash');

require('dotenv').config();
app = express();

const mongodb_uri = process.env.DB;

const store = new mongodbStore({
	uri: mongodb_uri,
	collection: 'sessions'
});

const csrfProtection = csrf();

app.use(express.static('public'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(
	session({
		secret: 'my_secret',
		resave: false,
		saveUninitialized: false,
		store: store
	})
);

app.use(csrfProtection);
app.use(flash());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	
	if (req.session.isLoggedIn){

	 res.locals.user = req.session.user


	}

	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use(avengerRoutes);
app.use(commentRoutes);
app.use(authRoutes);

mongoose
	.connect(mongodb_uri)
	.then((res) => {
		const port = process.env.PORT || 3000;

		app.listen(port, function() {
			console.log('\nBlog app has started');
		});
	})
	.catch((err) => {
		console.log(err);
		console.log('Something went wrong');
	});
