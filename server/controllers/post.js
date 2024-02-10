const User = require('../models/User');
const Post = require("../models/Posts");
const Profile = require("../models/Profile");

const createPost = async (req, res) => {
  try {
    const { postPic, content, userName } = req.body;

    // Find the user by their username
    const user = await User.findOne({ userName });
    const profile = await Profile.findOne({ userName });
    if (!user) throw new Error("User not found");

    const post = new Post({
      postPic,
      content,
      author: user._id, // Assign the user's ObjectId to the post's author field
      authorProfilePic: profile.profilePic,
    });

    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author'); // Populate the 'author' field to get user information

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createPost, fetchPosts };
