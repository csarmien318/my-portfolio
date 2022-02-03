import React from "react";
import PropTypes from "prop-types";
import { Paginate } from "./Paginate";
import { Table } from "react-bootstrap";
import { SongsTableHeader } from "./SongsTableHeader";

export const SongsTable = ({
  selectedArtist,
  pageNumber,
  setPageNumber,
  allSongs,
  setAllSongs,
  order,
  setOrder,
  sortColumn,
  setSortColumn,
}) => {
  const songs =
    selectedArtist !== "All Artists"
      ? allSongs.filter((s) => s.artist === selectedArtist)
      : allSongs;

  const songsPerPage = 4;
  const pagesVisited = pageNumber * songsPerPage;

  const pageChange = (selected) => {
    setPageNumber(selected);
  };

  const displaySongs = songs
    .slice(pagesVisited, pagesVisited + songsPerPage)
    .map((song) => (
      <tr key={song._id}>
        <td>{song.title}</td>
        <td>{song.artist}</td>
        <td>{song.album}</td>
        <td>{song.songLength}</td>
        <td>{song.releaseYear}</td>
      </tr>
    ));

  return (
    <div className="container col">
      <p>Showing {songs.length} songs in the database.</p>
      <Table striped hover>
        <SongsTableHeader
          songs={songs}
          setAllSongs={setAllSongs}
          order={order}
          setOrder={setOrder}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
        />
        <tbody>{displaySongs}</tbody>
      </Table>
      <Paginate
        songs={songs}
        songsPerPage={songsPerPage}
        pageNumber={pageNumber}
        onPageChange={pageChange}
      />
    </div>
  );
};

SongsTable.propTypes = {
  selectedArtist: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  allSongs: PropTypes.array.isRequired,
  setAllSongs: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  setSortColumn: PropTypes.func.isRequired,
};
