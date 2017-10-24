/**
 * require 'dependencies'
 */
var express               = require("express"),
    exphbs                = require("express-handlebars"),
    bodyParser            = require("body-parser"),
    cheerio               = require("cheerio"),
    mongojs               = require("mongojs"),
    mongoose              = require("mongoose"),
    request               = require("request"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user.js"),
    Card                  = require("./models/card.js"),
    Comment               = require("./models/comment.js"),
    methodOverride        = require("method-override");

// initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

// Static file support with public folder
app.use(express.static("public"));

// Setup Handlebars
var hbs = exphbs.create({
    helpers: {
        if_equal: function(x, y, opts) {
            if(x == y) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
        }
    },
    defaultLayout: "main"
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Setup Body-Parser
app.use(bodyParser.urlencoded({extended: true}));

// Allows all CRUD options
app.use(methodOverride("_method"));

// Setup Passport 
app.use(require("express-session")({
    secret: "No Anastasia and Heidi are",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//file require
require("./routes/routes.js")(app, passport);
require("./scrape/scrape.js")(app);

// Setup Mongo
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

//User.find(function (err, res) {
//    if (err) {
//        throw err;
//    } else {
//        console.log(res);
//    }
//})
//
//Card.find(function(err, res) {
//    if(err) {
//        throw err;
//    } else {
//        console.log(res);
//    }
//})

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running");
});
