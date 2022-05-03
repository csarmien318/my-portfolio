const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: String,
  password: String,
  numLogins: Number,
});

const Users = mongoose.model("Users", UsersSchema);

const usersData = {
  username: "Test",
  password: "",
  numLogins: 0,
};

const newUsers = new Users(usersData);

module.exports = Users;
