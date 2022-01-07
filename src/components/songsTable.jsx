import React from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class SongsTable extends React.Component {
  columns = [
    { path: "title", label: "Song" },
    { path: "artist.name", label: "Artist" },
    { path: "album", label: "Album" },
    { path: "songLength", label: "Length" },
    { path: "releaseYear", label: "Year Released" },
    {
      key: "like",
      content: (song) => (
        <Like liked={song.liked} onClick={() => this.props.onLike(song)} />
      ),
    },
  ];

  render() {
    const { songs, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={songs} columns={this.columns} />
      </table>
    );
  }
}

export default SongsTable;
