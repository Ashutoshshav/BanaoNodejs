const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    { 
      commentedUser: { type: String },
      commentText: { type: String }
    }
  ],
  likes: {
    type: Number,
    default: 0  // Default like count is set to 0
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
