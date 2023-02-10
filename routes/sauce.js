const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");
const upload = require("../middleware/multer-config");


router.post("/", auth, upload, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.sauceNotation);
router.put("/:id", auth, upload, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);

module.exports = router;
