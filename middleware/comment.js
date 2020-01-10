const comment = require("../models/comment")

module.exports=(req,res,next)=>{
    comment.findById(req.params.id)
    .then()
    .catch(err=>console.log(err))
}