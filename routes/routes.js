var User = require("../models/user.js");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

module.exports = function(app) {

    // Routes
    // ======

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
                console.log("DOC", doc);
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