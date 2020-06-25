var express = require("express");
var router = express.Router(),
	Comment = require("../models/comment"),
	Campground = require("../models/campground");

router.get("/", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds", {campgrounds: campgrounds, currentUser: req.user});
		}
	});	
});

router.post("/", isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username: req.user.username
	}
	var campground = {name:name, image:image, description:desc, author: author};
	Campground.create(campground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
		// get data from form and add them onto the array
			res.redirect("/campgrounds");
		}
	});
	
});

router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});


router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;