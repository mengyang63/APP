var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");
//APP config
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/Restful");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/Model config
var blogSchema =  new mongoose.Schema({
	title:String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes

// Blog.create({
// 	title:"Test Blog",
// 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDd6obZEcnpX9Jsc9ui-n5nPSNhTtHCTRR3vWkSnGdft5swAtR&usqp=CAU",
// 	body:"Testing!"
// });

app.get("/", function(req, res){
		res.redirect("/blogs");	
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err) {
			console.log(err);
		} else {
			res.render("home", {blogs: blogs});
		}
	}); 
});












app.listen(3000,function(){
	console.log("server is running");
});

