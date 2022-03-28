const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  username: String,
  refreshToken: String,
});

// Model
const Token = mongoose.model("Token", TokenSchema);

// Saving data to our mongo database
const tokenData = {
  username: "John Smith",
  refreshToken: "q843ncowurnrfhwoc3uchowuhto24t72cnvofhcnwpieufpwf0248rhfiwu",
};

const newToken = new Token(tokenData); // instance of the model

module.exports = Token;
