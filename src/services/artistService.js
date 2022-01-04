export const artists = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Pink Floyd" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "The Smiths" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Radiohead" },
];

export function getArtists() {
  return artists.filter((a) => a);
}
