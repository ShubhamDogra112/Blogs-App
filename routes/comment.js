const express = require("express");
const router = express.Router();
const commentController= require("../controllers/comment");



router.get("/avengers/:id/comment/new",commentController.newComment)

router.post("/avengers/:id/comment",commentController.postComment)

// router.get("avengers/:id/comment",commentController.showComment);

module.exports=router;
