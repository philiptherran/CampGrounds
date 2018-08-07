var express = require("express");
var router = express.Router();
var campGround = require("../models/campGround.js");
var middleware = require("../middleware/index.js");


router.get("/", function(req, res){
    campGround.find({}, function(err, campGrounds){
        if(err){
            console.log("hay un error");
        }else{
            console.log("nice!");
            res.render("campGrounds/index.ejs", {
                campGrounds: campGrounds, 
                user: req.user
            });
        }
});
    
});
//add new campgrounds
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name, 
        image: image, 
        description: description,
        author: author
    };
    campGround.create(newCampground, function(err, campGround){
        if(!err){
            res.redirect("campgrounds");
        } else{
            console.log(err);
        }
    });
    
});
//new
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campGrounds/new.ejs");
});

//show
router.get("/:id", function(req, res){
    var id= req.params.id;
    campGround.findById(id).populate("comments").exec(function(err, campGround){
        if(!err){
           res.render("campGrounds/show.ejs", {campGround:campGround}); 
        }else{
            console.log(err);
        }
    });
});

router.get("/:id/edit", middleware.isPermitted, function(req, res) {
    campGround.findById(req.params.id, function(err, campGround){
        var condition = campGround.author.id.equals(req.user._id);
        if(!err){
            return res.render("campGrounds/edit.ejs", {campGround: campGround});
        }
        
    });
});

router.put("/:id", middleware.isPermitted,function(req, res){
    
    campGround.findByIdAndUpdate(req.params.id, req.body.campGround, function(err, campGround){
        if(!err){
            return res.redirect("/campgrounds/"+ req.params.id);
        }
        return res.render("campGrounds/index.ejs");
    });
});

router.delete("/:id", middleware.isPermitted, function(req, res){
    campGround.findByIdAndRemove(req.params.id, function(err){
        if(!err){
            return res.redirect("/campgrounds");
        }
        else{
            return res.redirect("/campgrounds");
        }
    });
});

module.exports = router;