const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const TokensSchema = new Schema({
  username: String,
  refreshToken: String,
});

// Model
const Tokens = mongoose.model("Tokens", TokensSchema);

// Saving data to our mongo database
const tokensData = {
  username: "John Smith",
  refreshToken: "q843ncowurnrfhwoc3uchowuhto24t72cnvofhcnwpieufpwf0248rhfiwu",
};

const newToken = new Tokens(tokensData); // instance of the model

module.exports = Tokens;
