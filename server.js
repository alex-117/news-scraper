/**
 * require 'dependencies'
 */
var express    = require("express"),
    exphbs     = require("express-handlebars"),
    bodyParser = require("body-parser"),
    cheerio    = require("cheerio"),
    mongojs    = require("mongojs"),
    mongoose   = require("mongoose"),
    request    = require("request");

// initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

mongoose.Promise;

app.use(bodyParser.urlencoded({
  extended: false
}));

// handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Static file support with public folder
app.use(express.static("public"));

//file require
require("./routes/routes.js")(app);
require("./scrape/scrape.js")(app);

var User = require("./models/user.js");
var Card = require("./models/card.js");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Database configuration for mongoose
mongoose.connect(MONGODB_URI);
// Hook mongoose connection to db
var db = mongoose.connection;

// Log any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

User.find(function (err, res) {
    if (err) {
        throw err;
    } else {
        console.log(res);
    }
})

Card.find(function(err, res) {
    if(err) {
        throw err;
    } else {
        console.log(res);
    }
})

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running");
});
