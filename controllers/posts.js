const Post = require("../models/posts");
const mongoose = require("mongoose");

const handleGetPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    //console.log(post);
    res.status(201).render("post", {post});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleCreatePost = async (req, res) => {
  try {
    const { username, title, content } = req.body;

    const post = new Post({
      username,
      title,
      content,
    });

    await post.save();
    res.status(201).redirect("/api/posts");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleUpdatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, title, content } = req.body;

    const post = await Post.findByIdAndUpdate(id, { username, title, content });

    res.status(201).redirect(`/api/post/${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleDeletePost = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(id);
    await Post.findByIdAndDelete(id);
    res.status(201).redirect("/api/posts");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  handleGetPost,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
};
