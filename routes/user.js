const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleRenderLogin,
  handleUserLogin,
  handleGetForgotPassword,
  handleForgotPassword,
} = require("../controllers/user");

//Register API
router.post("/register", handleUserRegister);

//Login APi
router.get("/login", handleRenderLogin);
router.post("/login", handleUserLogin);

//Forgot-password API
router
  .get("/forgot-password", handleGetForgotPassword)
  .post("/forgot-password", handleForgotPassword);

module.exports = router;
