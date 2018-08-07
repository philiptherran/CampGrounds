var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var schema = new mongoose.Schema({
    username: String,
    password: String
});

schema.plugin(passportLocalMongoose);

var user = mongoose.model("user", schema);
module.exports = user;