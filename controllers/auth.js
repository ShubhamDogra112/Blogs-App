const bcrypt=require("bcryptjs")
const User =require("../models/users")
// const passport= require("passport")



// exports.postLogin=passport.authenticate("local",{
//     successRedirect:"/show",
//     failureRedirect:"/login"
// }),(err,res)=>{
//     if(err){
//         console.log(err)
//     }

//     else{
//         console.log("Succesfully logged in ")
//     }
// }


// exports.postSignUp=(req,res)=>{
//     let username = req.body.username;


//      User.register(new User({username:username}),req.body.password)
//         .then(user=>{
//             console.log(user)
//             console.log("User registered")
//             res.redirect("/login")

//         })
//         .catch(err=>{console.log(err)
        
        
//         })

    
// }





exports.getloginRoute=(req,res)=>{
    // const isLoggedIn=(req.get("Cookie").split(";")[1].trim().split("=")[1])==="true";
    const isLoggedIn=req.session.isLoggedIn
    res.render("auth/login",{isAuthenticated:isLoggedIn})
}

exports.getsignUp=(req,res)=>{
    // const isLoggedIn=(req.get("Cookie").split(";")[1].trim().split("=")[1])

    res.render("auth/sign-up",{isAuthenticated:req.session.isLoggedIn})
}




exports.postLogin=(req,res,next)=>{

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username})
    .then(user=>{
        if(!user){
            console.log("User not found")
            return   res.redirect("/login")

        }

        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){

                console.log("user logged in")
                req.session.isLoggedIn= true;
                req.session.user=user;
                req.session.save(err=>{
                    console.log(err)
                    return res.redirect("/")
                })
            }
            else{
                console.log("incorrect password")
            }
        })
        .catch(err=>console.log(err))

    })
    .catch(err=>{
        console.log(err)
        
    })


}

exports.logOut=(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect("/")
    })
}
 



exports.postSignUp=(req,res,next)=>{
    let username=req.body.username;
    let password = req.body.password;

    User.findOne({username:username})
    .then(user=>{
        if(user){
            console.log("user already exist")
           return  res.redirect("/login")
        }

        bcrypt.hash(password,12)
        .then(pass=>{
            const newUser= new User({
                username:username,
                password:pass
    
            })
            newUser.save()
            .then(user=>{
                
                console.log("new user registered")
                res.redirect("/login")
            })
            .catch(err=>{
                console.log(err)
                console.log("user not registered")
            })
        })
        .catch(err=>{
            console.log(err)
            console.log("password not hashed")
        })
        
       

    })
    .catch(err=>{
        console.log(err)
        
    })

}


