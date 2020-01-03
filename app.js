var express=require("express");
    bodyParser=require("body-parser");
    mongoose=require("mongoose");
    methodOverride=require("method-override");
    avengerRoutes =require("./routes/avenger")
    commentRoutes=require("./routes/comment")
      app=express();


app.use(express.static("public"));
app.use(express.static("images"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(methodOverride("_method"));


// Avenger.create({
//     name:"Thor",image:"2.JFIF",power:"Gamma monster"
// },function(err,avenger){
//     if(err){
//         console.log("Something Went wrong");
//         console.log(err)
//     }
//     else{
//         console.log("A new avenger is added")
//         console.log(avenger);
//     }
// });


app.use(avengerRoutes);
app.use(commentRoutes);



mongoose.connect("mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/test?retryWrites=true&w=majority")
.then(res=>{

        
app.listen(4000,function(){
    console.log("\nBlog app has started");
});
})

.catch(err=>{
    console.log(err)
    console.log("Something went wrong")
})

