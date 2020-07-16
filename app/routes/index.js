var express = require("express");
var router = express.Router(),
	User = require("../models/user"),
	passport = require("passport");

router.get("/", function(req, res) {
	res.render("landing");
});

// AUTH ROUTES
router.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash('success', "Welcome to APP" + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

// logout 
router.get("/logout", function(req, res){
	req.logout();
	req.flash('success', "Logged you Out!");
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;