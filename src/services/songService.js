const songs = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Time",
    artist: { _id: "5b21ca3eeb7f6fbccd471818", name: "Pink Floyd" },
    album: "The Dark Side of the Moon",
    songLength: "6:52",
    releaseDate: "March 1, 1973",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Money",
    artist: { _id: "5b21ca3eeb7f6fbccd471818", name: "Pink Floyd" },
    album: "The Dark Side of the Moon",
    songLength: "6:22",
    releaseDate: "March 1, 1973",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Have a Cigar",
    artist: { _id: "5b21ca3eeb7f6fbccd471818", name: "Pink Floyd" },
    album: "Wish You Were Here",
    songLength: "5:07",
    releaseDate: "September 12, 1975",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Wish You Were Here",
    artist: { _id: "5b21ca3eeb7f6fbccd471818", name: "Pink Floyd" },
    album: "Wish You Were Here",
    songLength: "5:41",
    releaseDate: "September 12, 1975",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Bigmouth Strikes Again",
    artist: { _id: "5b21ca3eeb7f6fbccd471814", name: "The Smiths" },
    album: "The Queen Is Dead",
    songLength: "3:12",
    releaseDate: "June 16, 1986",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "There Is a Light That Never Goes Out",
    artist: { _id: "5b21ca3eeb7f6fbccd471814", name: "The Smiths" },
    album: "The Queen Is Dead",
    songLength: "4:02",
    releaseDate: "June 16, 1986",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "What Difference Does It Make?",
    artist: { _id: "5b21ca3eeb7f6fbccd471814", name: "The Smiths" },
    album: "Hatful of Hollow",
    songLength: "3:51",
    releaseDate: "November 12, 1984",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Heaven Knows I'm Miserable Now",
    artist: { _id: "5b21ca3eeb7f6fbccd471814", name: "The Smiths" },
    album: "Hatful of Hollow",
    songLength: "3:35",
    releaseDate: "November 12, 1984",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Optimistic",
    artist: { _id: "5b21ca3eeb7f6fbccd471820", name: "Radiohead" },
    album: "Kid A",
    songLength: "5:15",
    releaseDate: "October 2, 2000",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471822",
    title: "Morning Bell",
    artist: { _id: "5b21ca3eeb7f6fbccd471820", name: "Radiohead" },
    album: "Kid A",
    songLength: "4:35",
    releaseDate: "October 2, 2000",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47182a",
    title: "Weird Fishes/Arpeggi",
    artist: { _id: "5b21ca3eeb7f6fbccd471820", name: "Radiohead" },
    album: "In Rainbows",
    songLength: "5:18",
    releaseDate: "October 10, 2007",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47182b",
    title: "House Of Cards",
    artist: { _id: "5b21ca3eeb7f6fbccd471820", name: "Radiohead" },
    album: "In Rainbows",
    songLength: "5:28",
    releaseDate: "October 10, 2007",
  },
];

export function getSongs() {
  return songs;
}

export function getSong(id) {
  return songs.find((m) => m._id === id);
}