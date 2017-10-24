var express = require("express");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

var mongoose = require("mongoose");
var Card = require("../models/card.js");


module.exports = function(app) {

    // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
    request("http://blog.counter-strike.net/#", function (error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
        var results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("div.inner_post").each(function (i, element) {

            // Save the text of the element in a "title" variable
            var title = $(element).children("h2").children("a").text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var image = $(element).children("p").children("a").children("img").attr("src");
            
            var date = $(element).children(".post_date").text();
            
            var description = $(element).children("p").text();
            var link = $(element).children("h2").children("a").attr("href");
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                image: image,
                date: date,
                description: description,
                link: link
            });
        });

        for(i = 0; i < results.length; i ++) {

            // We'll create a new user by using the User model as a class
            // The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
            var article = new Card({
                title: results[i].title,
                image: results[i].image,
                date: results[i].date,
                description: results[i].description,
                link: results[i].link
            });

            // Using the save method in mongoose, we create our example user in the db
            article.save(function(error, doc) {
                // Log any errors
                if (error) {
                    console.log(error);
                }
            });
        }

        // Log the results once you've looped through each of the elements found with cheerio

        return results;
    });
}