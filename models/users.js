const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: String,
  password: String,
  numLogins: Number,
});

// Model
const Users = mongoose.model("Users", UsersSchema);

const usersData = {
  username: "",
  password: "",
  numLogins: 0,
};

const newUsers = new Users(usersData); // instance of the model

module.exports = Users;
