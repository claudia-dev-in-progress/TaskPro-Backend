const { Schema, model } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  theme: {
    type: String,
    enum: ["dark", "light", "violet"],
    default: "light",
  },
});

const User = model("user", user);

module.exports = User;
