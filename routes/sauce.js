const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");

router.post("/", auth, upload.single("image"), sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.sauceNotation);
router.put("/:id", auth, upload.single("image"), sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);

module.exports = router;
