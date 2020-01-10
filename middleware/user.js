const Avenger= require("../models/avengers")


module.exports=(req,res,next)=>{
    Avenger.findById(req.params.id)
    .then(foundAvenger=>{
       if(foundAvenger.author.id.equals(req.session.user._id)){
            next();
        }
        else {
            res.redirect("back");
            console.log("You are not authorised to edit this Avenger")
        }
    })
    .catch(err=>{console.log(err)
    console.log("Something went wrong")})
}