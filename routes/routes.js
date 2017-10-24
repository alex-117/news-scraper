var User = require("../models/user.js");
var Comment = require("../models/comment.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");


module.exports = function(app, passport) {

    // Routes
    // ======

    //==================================================
    //User authentication routes
    //==================================================

    //Sign up route
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

    //==================================================
    // Home route which pulls in Card and Comment DB
    //==================================================
    app.get("/", function(req, res) {
        mongoose.model("Card").find(function(err, articles) {
            if(err) {throw err}
        }).then(function(dbCard) {
            mongoose.model("Comment").find(function(err, comments) {
                if(err) {throw err};
            }).then(function(dbComment) {
                res.render("index", {Card: dbCard, Comment: dbComment});  
            })
        });  
    });

    app.get("/myaccount", function(req, res) {
        mongoose.model("Comment").find(function(err, comments) {
            if(err) {throw err}
        }).then(function(dbComment) {
            res.render("account", {Comment: dbComment});
        })
    });

    // Create Comment
    app.post("/comment", function(req, res) {
        var comment = new Comment(req.body);

        comment.save(function(err, doc) {
            if(err) { 
                console.log(err);
            } else {
                res.redirect("/");
            }
        })
    });

    // Delete Comment
    app.delete("/comment/:id", function(req, res) {
        Comment.findByIdAndRemove(req.params.id, function(err, comment) {
            if(err) {throw err};
        }).then(function() {
            res.redirect("/");
        })
    });

    

};