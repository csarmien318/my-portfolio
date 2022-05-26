const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TokensSchema = new Schema({
  username: String,
  refreshToken: String,
});

const Tokens = mongoose.model("Tokens", TokensSchema);

const tokensData = {
  username: "",
  refreshToken: "",
};

const newToken = new Tokens(tokensData);

module.exports = Tokens;
