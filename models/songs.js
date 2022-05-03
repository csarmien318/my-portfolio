const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SongsSchema = new Schema({
  _id: String,
  title: String,
  artist: String,
  album: String,
  songLength: String,
  releaseYear: String,
});

const Songs = mongoose.model("Songs", SongsSchema);

const songsData = {
  _id: "",
  title: "",
  artist: "",
  album: "",
  songLength: "",
  releaseYear: "",
};

const newSongs = new Songs(songsData);

module.exports = Songs;
