var express=require("express");
    bodyParser=require("body-parser");
    mongoose=require("mongoose");
    methodOverride=require("method-override");
    avengerRoutes =require("./routes/avenger")
    commentRoutes=require("./routes/comment")
    authRoutes=require("./routes/auth")
    // local =require("passport-local")
    // passport = require("passport")
    expressSession=require("express-session")
    User =require("./models/users")
      app=express();


//  auth     
// app.use(expressSession({
//     secret:"Anubhav is a asshole",
//     resave:false,
//     saveUninitialized:false
// }))

// app.use(passport.initialize())
// app.use(passport.session())

// passport.use(new local(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));
app.use(express.static("images"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(methodOverride("_method"));




app.use(avengerRoutes);
app.use(commentRoutes);
app.use(authRoutes)



mongoose.connect("mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/test?retryWrites=true&w=majority")
.then(res=>{

        
app.listen(3000,function(){
    console.log("\nBlog app has started");
});
})

.catch(err=>{
    console.log(err)
    console.log("Something went wrong")
})

