const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:string
})

module.exports=mongoose.model('User',userSchema);