var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/blog_demo");

// Post - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String,
});
var Post = mongoose.model("Post", postSchema);

// User = email, name 
var userSchema = new mongoose.Schema({
	email: String,
	name:  String,
	posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

User.findOne({name:"Mack Brown"}, function(err, user){
	if (err) {
		console.log(err);
	} else {
		user.posts.push({
			title:"Fight for the future",
			content: "YOu will thank me"
		});
		user.save(function(err, user){
			if (err) {
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});

// var newUser = new User({
// 	email:"Love@gmail.com",
// 	name:"Kevin Love"
// });

// newUser.posts.push({
// 	title:"Best pf of cavs",
// 	content: "The other suck"
// });

// newUser.save(function(err, user){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// newUser.save(function(err, user){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "nba2k",
// 	content: "It sucks!"
// });

// newPost.save(function(err, post){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });