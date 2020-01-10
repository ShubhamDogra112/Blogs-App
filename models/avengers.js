const mongoose= require("mongoose");
const Comment = require("./comment");
const user  = require("../models/users")
const avengerSchema= new mongoose.Schema({
    name:String,
image:String,
power:String,
created:{type:Date,default:Date.now},

posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
}],
author:{
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    },
    name:{
        type:String
    }
}

})

module.exports=mongoose.model('Avenger',avengerSchema);