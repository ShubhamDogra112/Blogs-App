const express =require("express");
const mongoose =require("mongoose");

const commentSchema = new mongoose.Schema({
    message:String,
    author:String,

})


module.exports=mongoose.model("Comment",commentSchema);