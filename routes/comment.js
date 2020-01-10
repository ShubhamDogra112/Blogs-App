const express = require("express");
const router = express.Router();
const commentController= require("../controllers/comment");
const isAuth = require("../middleware/auth")




router.get("/avengers/:id/comment/new",isAuth,commentController.newComment)

router.post("/avengers/:id/comment",commentController.postComment)

router.get("/avengers/:id/comment/:comment_id/edit",commentController.editComment)

router.put("/avengers/:id/comment/:comment_id",commentController.updateComment)


router.delete("/avengers/:id/comment/:comment_id",commentController.deleteComment)
module.exports=router;
