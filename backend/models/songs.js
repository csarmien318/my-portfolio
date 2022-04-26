const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const SongsSchema = new Schema({
  _id: String,
  title: String,
  artist: String,
  album: String,
  songLength: String,
  releaseYear: String,
});

// Model
const Songs = mongoose.model("Songs", SongsSchema);

// Saving data to our mongo database
const songsData = {
  _id: "",
  title: "",
  artist: "",
  album: "",
  songLength: "",
  releaseYear: "",
};

// .save(); which saves data into MongoDB
// newSongs.save((error) => {
//   if (error) {
//     console.log("Oops, something happend...");
//   } else {
//     console.log("Data has been saved!");
//   }
// });

const newSongs = new Songs(songsData); // instance of the model

module.exports = Songs;
