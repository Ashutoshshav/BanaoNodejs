const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const User = require("../models/user");

const handleUserRegister = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    await User.create({ username, email, password: hashedPassword });

    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send("Login successful.");
    } else {
      res.status(401).send("Invalid username or password.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const resetToken = Math.random().toString(36).substring(2, 15);
      user.resetToken = resetToken;
      user.resetTokenExpiry = new Date(Date.now() + 3600000);

      await user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "heber.weber@ethereal.email",
          pass: "WzSpPsGFK9qaUhWmyG",
        },
      });

      const mailOptions = {
        from: "ashutoshshav@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Use the following token to reset your password: ${resetToken}`,
      };

      await transporter.sendMail(mailOptions);
      res.send("Password reset token sent to your email.");
    } else {
      res.status(404).send("User not found with the provided email address.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleForgotPassword,
};
