import React from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getSongs } from "../services/songService";
import { getArtists } from "../services/artistService";
import { paginate } from "../utils/paginate";

class Songs extends React.Component {
  state = {
    songs: [],
    artists: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ songs: getSongs(), artists: getArtists() });
  }

  handleLike = (song) => {
    const songs = [...this.state.songs];
    const index = songs.indexOf(song);
    songs[index] = { ...songs[index] };
    songs[index].liked = !songs[index].liked;
    this.setState({ songs });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.songs;
    const { pageSize, currentPage, songs: allSongs } = this.state;

    if (count === 0) return <p>There are no songs in the database.</p>;

    const songs = paginate(allSongs, currentPage, pageSize);

    return (
      <div className="row">
        <h1>Songs Project</h1>
        <div className="col-2">
          <ListGroup
            items={this.state.artists}
            selectedItem={this.state.selectedArtist}
            onItemSelect={this.handleArtistSelect}
          />
        </div>
        <div className="col">
          <p>There are {count} songs in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Length</th>
                <th>Release Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song._id}>
                  <td>{song.title}</td>
                  <td>{song.artist.name}</td>
                  <td>{song.album}</td>
                  <td>{song.songLength}</td>
                  <td>{song.releaseDate}</td>
                  <td>
                    <Like
                      liked={song.liked}
                      onClick={() => this.handleLike(song)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Songs;
