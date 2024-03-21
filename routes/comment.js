const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Post = require("../models/posts");

router
  .route("/comment/:id")
  .get((req, res) => {
    try {
      const id = req.params.id;
      res.render("comment", { id });
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const id = req.params.id;
      const { commentedUser, commentText } = req.body;

      const post = await Post.findById(id);

      post.comments.push({
        commentedUser: commentedUser,
        commentText: commentText,
      });

      await post.save();

      res.redirect(`/api/post/${id}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.get("/like/:id", async (req, res) => {
        try {
                const id = req.params.id;

                const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

                //console.log(post);
                res.status(201).redirect(`/api/post/${id}`);
        } catch (error) {
                res.status(500).send(error.message);
        }
});

module.exports = router;
