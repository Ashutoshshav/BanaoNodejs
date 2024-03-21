const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');

const dbConnect = require("./utils/db");
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");
const staticRouter = require("./routes/staticRoute");
const { verifyToken } = require("./auth/auth");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());

dbConnect().then(() => {
  console.log("db connected");
});

app.get("/", (req, res) => {
  res.render("register");
});

app.use("/api", userRouter);
app.use("/api", verifyToken, staticRouter);
app.use("/api", verifyToken, postRouter);
app.use("/api", verifyToken, commentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
