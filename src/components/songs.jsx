import React from "react";
import ListGroup from "./common/listGroup";
import SongsTable from "./songsTable";
import Pagination from "./common/pagination";
import { getSongs } from "../services/songService";
import { getArtists } from "../services/artistService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Songs extends React.Component {
  state = {
    songs: [],
    artists: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "", order: "asc" },
  };

  componentDidMount() {
    const artists = [{ _id: "", name: "All Artists" }, ...getArtists()];

    this.setState({ songs: getSongs(), artists });
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

  handleArtistSelect = (artist) => {
    this.setState({ selectedArtist: artist, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.songs;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedArtist,
      songs: allSongs,
    } = this.state;

    if (count === 0) return <p>There are no songs in the database.</p>;

    const filtered =
      selectedArtist && selectedArtist._id
        ? allSongs.filter((s) => s.artist._id === selectedArtist._id)
        : allSongs;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const songs = paginate(sorted, currentPage, pageSize);

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
          <p>Showing {filtered.length} song(s) in the database.</p>
          <SongsTable
            songs={songs}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
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
