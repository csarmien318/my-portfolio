const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: String,
  password: String,
});

// Model
const Users = mongoose.model("Users", UsersSchema);

const usersData = {
  username: "",
  password: "",
};

const newUsers = new Users(usersData); // instance of the model

module.exports = Users;
