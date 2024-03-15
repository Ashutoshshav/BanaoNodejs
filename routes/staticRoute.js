const express = require("express");
const router = express.Router();

const Post = require("../models/posts");

router.get("/create-post", (req, res) => {
  res.render("createPost");
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).render("posts", { posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/update-post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    //console.log(post);
    res.status(201).render("updatePost", { post });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
