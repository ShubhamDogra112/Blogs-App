const mongoose= require("mongoose");
const Comment = require("./comment");
const avengerSchema= new mongoose.Schema({
    name:String,
image:String,
power:String,
created:{type:Date,default:Date.now},

posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
}]

})

module.exports=mongoose.model('Avenger',avengerSchema);