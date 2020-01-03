const Avenger = require('../models/avengers');
const comment = require('../models/comment');

exports.newComment = (req, res, next) => {
	Avenger.findById(req.params.id)
		.then((foundAvenger) => {
			res.render('comment/new-comment', { Avenger: foundAvenger });
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
