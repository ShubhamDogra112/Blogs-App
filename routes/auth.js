const express =require("express")
const router = express.Router();
const authController=require("../controllers/auth")



router.get("/login",authController.getloginRoute)

router.post("/login",authController.postLogin)

router.get("/sign-up",authController.getsignUp)

router.post('/sign-up',authController.postSignUp)

router.get("/log-out",authController.logOut)


module.exports=router;