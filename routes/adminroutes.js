const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

router.get("/", adminController.getDashboard);
router.get('/books', adminController.listBooks);
router.get('/books/add', adminController.addBookForm);
router.get('/books/edit/:id', adminController.editBookForm);

module.exports = router;