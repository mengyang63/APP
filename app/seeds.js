var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{
		name : "random camp",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG0H1InU_IOgorPXvNZ1ddtB6ZHKYpwxGEdw&usqp=CAU",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	},
	{
		name : "random camp 2",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG0H1InU_IOgorPXvNZ1ddtB6ZHKYpwxGEdw&usqp=CAU",
		description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	},
	{
		name : "random camp 3",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG0H1InU_IOgorPXvNZ1ddtB6ZHKYpwxGEdw&usqp=CAU",
		description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	}];

function seedDB(){
	// Remove all the campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		} 
		console.log("removed campground");

		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if (err) {
					console.log(err);
				} else {
					console.log("added a campground");
					Comment.create({text: "This place doesn't support internet!",
									author: "Dave"
								   }, function(err, comment){
									if (err) {
										console.log(err);									
									} else {
										campground.comments.push(comment);
										campground.save();
										console.log("Created new comment");
									}
					});
				}
			});
	});
});
	
	// add a few campgrounds

	// add a few comments
}

module.exports = seedDB;