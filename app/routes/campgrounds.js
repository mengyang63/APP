var express = require("express");
var router = express.Router(),
	Comment = require("../models/comment"),
	Campground = require("../models/campground"),
	middleware = require("../middleware/index.js");

router.get("/", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds", {campgrounds: campgrounds, currentUser: req.user});
		}
	});	
});

router.post("/",  middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id:req.user._id,
		username: req.user.username
	}
	var campground = {name:name, image:image, description:desc, author: author, price: price};
	Campground.create(campground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
		// get data from form and add them onto the array
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new",  middleware.isLoggedIn, function(req, res) {
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

// Edit 
router.get("/:id/edit",  middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});		
	});
});

// Update
router.put(":/id",  middleware.checkCampgroundOwnership, function(req, reas){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			res.redirect("campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Destroy
router.delete("/:id",  middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;
	
	
	