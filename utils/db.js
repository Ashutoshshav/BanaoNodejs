const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/banaoGroup");
};

module.exports = dbConnect;
