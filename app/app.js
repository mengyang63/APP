var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// mongoose setup
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res) {
	res.render("landing");
});


// Campground.create(
// 		{
// 			name: "Beijing", 
// 			image: "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/asia/beijing_travel.jpg" ,
// 			description: "This city is marvaless"
// 		}, function(err, campground) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log("new camp");
// 				console.log(campground);
// 			}
// 		});

// var campgrounds = [
// 		{name: "Beijing", image: "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/asia/beijing_travel.jpg" },
// 		{name: "Rizhao", image:"sfs"},
// 		{name: "Shanghai", image:""}		
// 	];

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
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
	res.render("new");
});


app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});

});

app.listen(3000, function() { 
  console.log('YelpCamp Sever has started'); 
});