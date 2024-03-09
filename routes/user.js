const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserLogin,
  handleForgotPassword,
} = require("../controllers/user");

//Register API
router.post("/register", handleUserRegister);

//Login APi
router.post("/login", handleUserLogin);

//Forgot-password API
router.post("/forgot-password", handleForgotPassword);

module.exports = router;
