var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require('connect-flash-plus');

var user = require("./models/user.js");
var campGroundRoutes = require("./routes/campgrounds.js");
var commentRoutes = require("./routes/comments.js");
var indexRoutes = require("./routes/index.js");

//mongoose.connect("mongodb://localhost:27017/yelpcamp");
mongoose.connect("mongodb://<philiptherran>:<PasteL0127>@ds115762.mlab.com:15762/dbcamping");
//mongodb://<philiptherran>:<PasteL0127>@ds115762.mlab.com:15762/dbcamping

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
console.log(__dirname);

app.use(require('express-session')({
    secret:"chele is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.message = {
        success: req.flash('success'),
        danger: req.flash('danger'),
        warning: req.flash('warning')
    };
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campGroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP);

