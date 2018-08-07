var mongoose = require("mongoose");

var schema = mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

var comments = mongoose.model("comment", schema);
module.exports = comments;