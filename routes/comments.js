var express = require("express");
var router = express.Router({mergeParams: true});
var campGround = require("../models/campGround.js");
var comment = require("../models/comments.js");
var middleware = require("../middleware/index.js");

router.get("/new", middleware.isLoggedIn,function(req, res) {
    campGround.findById(req.params.id, function(err, campGround){
        if(!err){
            res.render("comments/new.ejs", {campGround:campGround});
        }else{
            console.log(err);
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    campGround.findById(req.params.id, function(err, campGround) {
       if(!err){
           comment.create(req.body.comment, function(err, comment){
               if(!err){
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campGround.comments.push(comment);
                   campGround.save();
                   res.redirect("/campgrounds/"+ req.params.id);
               }
               else{
                   console.log(err);
               }
           });
       } 
       else{
           console.log(err);
           res.redirect("/campgrounds");
       }
    });
});

router.get("/:comment_id/edit", middleware.checkAuthor, function(req, res) {
    comment.findById(req.params.comment_id, function(err, comment){
        if(!err){
            
            res.render("comments/edit.ejs", {
                comment:comment, 
                campGroundId: req.params.id
            });
        }else{
            console.log(err);
        }
    });
});

router.put("/:comment_id", middleware.checkAuthor, function(req, res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(!err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkAuthor,function(req, res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(!err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;