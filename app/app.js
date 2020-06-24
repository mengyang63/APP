var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds"),
	Comment = require("./models/comment");

// mongoose setup
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname +"/public"));
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds", {campgrounds: campgrounds});
		}
	});	
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var campground = {name:name, image:image, description:desc};
	Campground.create(campground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
		// get data from form and add them onto the array
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});


app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});

});


//These are for the comments
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log("error");
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

app.listen(3000, function() { 
  console.log('YelpCamp Sever has started'); 
});