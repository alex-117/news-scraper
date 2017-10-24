// Dependencies
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var UserSchema = new Schema({
    
    username: { type: String},
    password: { type: String}
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;