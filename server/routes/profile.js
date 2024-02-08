const express = require('express');
const {updateProfile} = require('../controllers/profile');
const router = express.Router();

// profile route
router.post("/updateprofile", updateProfile);

module.exports = router;