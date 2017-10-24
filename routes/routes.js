var User = require("../models/user.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function(app, passport) {

    // Routes
    // ======




    //PASSPORT ROUTES
    app.post("/signup", function(req, res) {
        User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
            if(err) {
                console.log(err);
                return res.render("index");
            }
            passport.authenticate("local")(req, res, function() {
                res.redirect("/");
            })
        })
    });

    // Sign in routes
    app.get("/login", function(req, res) {
        res.render("index");
    });

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/",

        failureRedirect: "/"
    }));


    // logout route
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
    //END PASSPORT ROUTES

    // Route to post our form submission to mongoDB via mongoose
    app.post("/submit", function(req, res) {

        // We use the "Example" class we defined above to check our req.body against our user model
        var user = new User(req.body);

        // With the new "Example" object created, we can save our data to mongoose
        // Notice the different syntax. The magic happens in userModel.js
        user.save(function(error, doc) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise, send the new doc to the browser
            else {
                res.send(doc);
            }
        });
    });


    app.get("/", function(req, res) {
        mongoose.model("Card").find(function(err, articles) {
            if(err) {throw err}
        }).then(function(dbCard) {
            res.render("index", {Card: dbCard});
        });  
    });

    app.get("/users", function(req, res) {
        mongoose.model("User").find(function(err, users) {
            if(err) {
                console.log(err);
            }
        }).then(function() {
            res.send(users);
        });  
    });

    app.get("/blog", function(req, res) {
        mongoose.model("Card").find(function(err, articles) {
            if(err) {
                console.log(err);
            } else {
                res.send(articles);
            }
        })
    });

};