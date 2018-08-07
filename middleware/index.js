var comment = require("../models/comments.js");
var campGround = require("../models/campGround.js");

var middleware = {}

middleware.checkAuthor = function(req,res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, comment) {
            if(!err && comment.author.id.equals(req.user._id)){
                req.flash('success', 'Successful action');
                next();
            }
            else{
                req.flash('danger', 'permission denied');
                res.redirect("/campgrounds");
            }
            
        });
    }else{
        req.flash('warning', 'Please, login first!');
        res.redirect("/login");
    }
}

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('warning', 'Please, login first!');
    res.redirect("/login");
}

middleware.isPermitted = function(req, res, next){
    if(req.isAuthenticated()){
        campGround.findById(req.params.id, function(err, campGround){
            var condition = campGround.author.id.equals(req.user._id);
            if(!err && condition){
                req.flash('success', 'Successful action');
                return next();
            }
            else{
                req.flash('danger', 'permission denied');
                res.redirect("/campgrounds");
            }
       });    
    }
    else {
        req.flash('warning', 'Please, login first!');
        return res.redirect("/login");
    }
    
}

module.exports = middleware;
