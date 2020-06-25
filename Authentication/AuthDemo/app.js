var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./models/user"),
	app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//====================================
//

app.use(require("express-session")({
	secret: "I love Rizhao",
	resave: false,
	saveUninitialized: false
}))


app.get("/", function(req, res){
	res.render("home");
})

app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
})

//Show signup form
app.get("/register", function(req, res){
	res.render("register");
});

// handling user sign signup
app.post("/register", function(req, res){
	var userName = req.body.username,
		password = req.body.password;
	User.register(new User({username: req.body.username}), password, function(err, user){
		if (err) {
			console.log(err);
			return res.render('register');
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	})
});

// login routes
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
		successRedirect:"/secret",
		failureRedirect:"/login"
	}), function(req, res){
});

// log out
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
});

//middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


app.listen(3000, function() { 
  console.log('Sever has started'); 
});