var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Beijing", image: "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/asia/beijing_travel.jpg" },
		{name: "Rizhao", image:"sfs"},
		{name: "Shanghai", image:""}		
	];
	
	res.render("campgrounds", {campgrounds, campgrounds});
});

app.listen(3000, function() { 
  console.log('YelpCamp Sever has started'); 
});