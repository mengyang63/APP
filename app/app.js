var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

var campgrounds = [
		{name: "Beijing", image: "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/asia/beijing_travel.jpg" },
		{name: "Rizhao", image:"sfs"},
		{name: "Shanghai", image:""}		
	];

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds, campgrounds});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var campground = {name:name, image:image};
	campgrounds.push(campground);
	// get data from form and add them onto the array
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.listen(3000, function() { 
  console.log('YelpCamp Sever has started'); 
});