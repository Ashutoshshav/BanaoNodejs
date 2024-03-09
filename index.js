const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const dbConnect = require("./utils/db");
const userRouter = require("./routes/user");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const app = express();
const port = 3000;

dbConnect().then(() => {
  console.log("db connected");
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
