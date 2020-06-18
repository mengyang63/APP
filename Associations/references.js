var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/blog_demo_2");

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
	posts: [{
		type:mongoose.Schema.Types.ObjectID,
		ref :"Post"
	}]
});
var User = mongoose.model("User", userSchema);

// User.create({
// 	email:"afadaf@gmail.com",
// 	name:"JR Smith"
// });

// Post.create({
// 	title:"how to win the champ2",
// 	content:"fjaljdalfjasdkjal"
// 	}, function(err, post){
// 		User.findOne({name:"JR Smith"}, function(err, foundUser){
// 			foundUser.posts.push(post);
// 			foundUser.save(function(save, data){
// 				console.log(data);
// 			})
// 		});	
// 	}
// );


User.findOne({name: "JR Smith"}).populate("posts").exec(function(err, user){
	console.log(user);
})