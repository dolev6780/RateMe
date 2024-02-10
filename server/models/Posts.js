const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postPic: {
    type: String,
    required: true,
  },
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  authorProfilePic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
