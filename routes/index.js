var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user.js");

router.get("/", function(req, res){
    res.render("campGrounds/landing.ejs");
});

router.get("/register", function(req, res) {
    res.render("register.ejs");
});

router.post("/register", function(req, res) {
    var newUser = new user({username: req.body.username});
    
     user.register(newUser, req.body.password, function(err, user){
         if(!err){
             passport.authenticate("local")(req, res, function(){
                    req.flash('success', 'Successfully registered');
                    res.redirect("/campgrounds");   
             });
         }else{
              req.flash('warning', err.message);
              console.log(err.message);
              return res.redirect("/register");
         }
     });
    //res.send(newUser.password+ " , " + newUser.username);
});

router.get("/login", function(req, res) {
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    })
);

router.get("/logout", function(req, res) {
    req.logout();
    req.flash('warning', 'You logged out!');
    res.redirect("/campgrounds");
});

module.exports = router;