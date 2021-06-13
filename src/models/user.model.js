const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;