var express=require("express");
    bodyParser=require("body-parser");
    mongoose=require("mongoose");
    methodOverride=require("method-override");
    avengerRoutes =require("./routes/avenger")
    commentRoutes=require("./routes/comment")
    authRoutes=require("./routes/auth")
    sesson = require("express-session")

    mongodbStore = require("connect-mongodb-session")(sesson) 
    expressSession=require("express-session")
    User =require("./models/users")
    csrf = require("csurf")
    flash= require("connect-flash")
      app=express();

      const store = new mongodbStore({

        uri:"mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/test?retryWrites=true&w=majority",
        collection:"sessions"
      })

      const csrfProtection =csrf();




app.use(express.static("public"));
app.use(express.static("images"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(sesson({
    secret:"my_secret",
    resave:false,
    saveUninitialized:false,
    store:store
}))

app.use(csrfProtection)
app.use(flash());
app.use(methodOverride("_method"));

app.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
    res.locals.csrfToken=req.csrfToken();
    next();
})


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

