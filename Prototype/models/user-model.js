const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  fitbitid: String,
  token: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
