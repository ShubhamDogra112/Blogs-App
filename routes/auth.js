const express =require("express")
const router = express.Router();
const authController=require("../controllers/auth")
const isAuth = require("../middleware/auth")



router.get("/login",authController.getloginRoute)

router.post("/login",authController.postLogin)

router.get("/sign-up",authController.getsignUp)

router.post('/sign-up',authController.postSignUp)

router.post("/log-out",authController.logOut)

router.get("/reset",authController.getReset)

router.post("/reset",authController.postReset)

router.get("/reset/:token",authController.getNewPassword)

router.post("/new-password",authController.postNewPassword)



module.exports=router;
