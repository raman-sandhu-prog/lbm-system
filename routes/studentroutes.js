const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentcontroller');

router.get('/', studentController.getDashboard);

module.exports = router;