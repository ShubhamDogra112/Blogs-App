const Avenger = require('../models/avengers');
const comment = require('../models/comment');
const user  = require("../models/users")
const userOwner = require("../middleware/user")


exports.newComment = (req, res, next) => {
	Avenger.findById(req.params.id)
		.then((foundAvenger) => {
			

			res.render('comment/new-comment', { Avenger: foundAvenger});
		})
		.catch((err) => {
			console.log(err);
			console.log('Something went wrong');
		});
};

exports.postComment = (req, res, next) => {
		 Avenger.findById(req.params.id)
		 .then(avenger=>{
			 comment.create(req.body.comment)
			 .then(comment=>{
				 comment.author.id=req.session.user._id;
				 comment.author.name=req.session.user.username;
				 comment.save();
				 avenger.posts.push(comment)
				 avenger.save()
				 .then(avenger=>{
					 console.log(avenger)
					 console.log("Successful")
					 res.redirect("/avengers/"+avenger._id)
				 })
				 .catch(err=>console.log(err))
			 })
			 .catch(err=>{
				 console.log(err);
			 })
		 })
		 .catch(err=>console.log(err));
};


exports.editComment=(req,res,next)=>{

	comment.findById(req.params.comment_id)
	.then(foundComment=>{

		res.render("comment/edit-comment",{
			
			avenger_id:req.params.id,
			comment:foundComment
	
	
		})

	})
	.catch(err=>{
		console.log(err);
	})

	

}

exports.updateComment=(req,res,next)=>{

	// let Comment= new comment({
	// 	message:req.body.message
	// })
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment)
	.then(comment=>{
		console.log("Comment updated")
		res.redirect("/show")
	})
	.catch(err=>{
		console.log(err)
	})
}

exports.deleteComment=(req,res,next)=>{
	comment.findByIdAndRemove(req.params.comment_id)
	.then(data=>{console.log("Deleted comment successfully")
	res.redirect("back")
})
	.catch(err=>console.log(err))
}