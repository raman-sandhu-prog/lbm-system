const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const session = require("express-session");

router.get("/",authController.gethome);
router.use(session({
  secret: "librarysecret",
  resave: false,
  saveUninitialized: true
}));
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);


router.get("/logout", authController.logout);

module.exports = router;