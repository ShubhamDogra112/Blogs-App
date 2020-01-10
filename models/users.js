const mongoose= require("mongoose");
// const  comment = require("../models/comment")

const userSchema= new mongoose.Schema({
    // email:String,/
    password:String,
    username:String

    
})

// userSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model('User',userSchema);

