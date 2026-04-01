const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

router.get("/", adminController.getDashboard);

module.exports = router;