var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        ],
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

var campGround = mongoose.model("campGround", schema);

module.exports = campGround;