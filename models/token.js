const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TokensSchema = new Schema({
  username: String,
  refreshToken: String,
});

const Tokens = mongoose.model("Tokens", TokensSchema);

const tokensData = {
  username: "John Smith",
  refreshToken: "q843ncowurnrfhwoc3uchowuhto24t72cnvofhcnwpieufpwf0248rhfiwu",
};

const newToken = new Tokens(tokensData);

module.exports = Tokens;
