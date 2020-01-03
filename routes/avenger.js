const express =require("express")
const router=express.Router();
const avengerController = require("../controllers/avenger")


router.get("/",avengerController.rootRoute)


router.get("/show",avengerController.showRoute)

// router.get("/show/add",avengerController.addShowRoute)

router.post("/avengers",avengerController.postAvenger)

router.get("/avengers/new",avengerController.newAvenger)



router.get("/avengers/:id",avengerController.moreInfo);


//edit route
router.get("/avengers/:id/edit",avengerController.editAvenger);


//updating
router.put("/avengers/:id",avengerController.updateAvenger);


//Delete
router.delete("/avenger/:id",avengerController.deleteAvenger)

module.exports=router;
