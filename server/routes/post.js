const express = require('express');
const { createPost, fetchPosts } = require("../controllers/post");
const router = express.Router();

// profile route
router.post("/createpost", createPost);
router.get("/fetchposts", fetchPosts);

module.exports = router;