const express = require("express");
const router = express.Router();

const {
  handleGetPost,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} = require("../controllers/posts");

router
  .route("/post/:id")
  .get(handleGetPost)
  .put(handleUpdatePost)
  .delete(handleDeletePost);

router.post("/post", handleCreatePost);

module.exports = router;
