// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a CommentSchema object with the Schema class we just made
var CommentSchema = new Schema({
    
    author: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    articleId: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model, so it can be used in server.js with a require
module.exports = Comment;