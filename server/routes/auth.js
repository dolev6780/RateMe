const express = require('express');
const {signin, signup} = require('../controllers/auth');
const router = express.Router();

// signin route
router.post('/signin',signin);

//signup route
router.post('/signup',signup);


module.exports = router;