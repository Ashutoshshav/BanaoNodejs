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

    res.status(201).render("login");
    //res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      //res.send("Login successful.");
      res.status(201).render("posts");
    } else {
      res.status(401).send("Invalid username or password.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleGetForgotPassword = (req, res) => {
  res.render("forgot-password");
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
        service: "gmail",
        auth: {
          user: "ashutoshshav@gmail.com",
          pass: "Ashu#2609512",
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
  handleGetForgotPassword,
  handleForgotPassword,
};
