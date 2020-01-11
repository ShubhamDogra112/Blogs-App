
const express= require("express");
const Avenger= require("../models/avengers");
const comment = require("../models/comment");


exports.rootRoute=(req,res)=>{
    Avenger.find()
    .then(avengers=>{
        
    
        
        res.render("avengers/index",{avengers:avengers})
    })
    .catch(err=>{console.log(err)
    console.log("Something went wrong")})
}




exports.showRoute=(req,res)=>{
    Avenger.find()
    .then(avengers=>{
    
    res.render("avengers/show-avengers",{avengers:avengers})})
    .catch(err=>{console.log(err)
    console.log("Something went wrong")})
}

// exports.addShowRoute=(req,res)=>{
//     Avenger.find()
//     .then(avengers=>res.render("avengers/show-add-avenger",{avengers:avengers}))
//     .catch(err=>{console.log(err)
//     console.log("Something went wrong")})
// }

exports.postAvenger=function(req,res){

    Avenger.create(req.body.avenger,function(err,avenger){

        if(err){
            console.log("Something went wrong")
            console.log(err);
            }
            else{
                console.log("A new Avenger is added");
                // console.log(avenger);
                avenger.author.id=req.session.user._id;
                avenger.author.name=req.session.user.username;
                avenger.save();
            }
    });   res.redirect("/");
}

exports.moreInfo=function(req,res){
    Avenger.findById(req.params.id).populate("posts").exec(function(err,foundavenger){
        if(err){
            res.redirect("/");
    
        }
        else{
    

            res.render("avengers/more-info",{avenger:foundavenger});
        }
    })
    
    
    }

    exports.newAvenger=function(req,res){

        
 
        res.render("avengers/new-avengers");
    }


    exports.editAvenger=function(req,res){
        Avenger.findById(req.params.id,function(err,foundavenger){
            if(err){
                res.redirect("/");
        
            }
            else{

                res.render("avengers/edit",{avenger:foundavenger});
            }
        })
    
    
    
    }

    exports.updateAvenger=function(req,res){
        Avenger.findByIdAndUpdate(req.params.id,req.body.avenger,function(err,avenger){
            if(err){
                console.log("someting went wrong");
                console.log(err);
        
            }
            else {
                console.log("avenger is updated")
                console.log(avenger);
                res.redirect("/");
            }
        })
        
        }


    exports.deleteAvenger=function(req,res){

        Avenger.findByIdAndRemove(req.params.id,function(err){
            if(err){
                console.log("Something went wrong")
                console.log(err);
            }
            else{
                console.log("Deleted Successfully from db");
                res.redirect("/");
            }
        })
    
    }