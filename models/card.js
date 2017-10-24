// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var CardSchema = new Schema({
    
    title: {
        type: String,
        unique: true,
        required: "Username is required"
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        requied: true
    }
});

var Card = mongoose.model("Card", CardSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = Card;