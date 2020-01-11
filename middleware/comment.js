const comment = require("../models/comment")
module.exports=(req,res,next)=>{
    comment.findById(req.params.comment_id)
    .then(foundComment=>{
       if(foundComment.author.id.equals(req.session.user._id)){
            next();
        }
        else {
            res.redirect("back");
            console.log("You are not authorised to do the same")
        }
    })
    .catch(err=>{console.log(err)
    console.log("Something went wrong")})
}