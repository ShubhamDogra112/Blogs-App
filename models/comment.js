const express =require("express");
const mongoose =require("mongoose");
const user = require("../models/users")

const commentSchema = new mongoose.Schema({
    message:String,
    author:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'

        },
        name:{
            type:String
        }
    }

})


module.exports=mongoose.model("Comment",commentSchema);