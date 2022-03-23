const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  username: String,
  password: String,
});

// Model
const Login = mongoose.model("Login", LoginSchema);

const loginData = {
  username: "",
  password: "",
};

const newLogin = new Login(loginData); // instance of the model

module.exports = Login;
