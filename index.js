const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");

const dbConnect = require("./utils/db");
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");
const staticRouter = require("./routes/staticRoute");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

dbConnect().then(() => {
  console.log("db connected");
});

app.get("/", (req, res) => {
  res.render("register");
});

app.use("/api", staticRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
