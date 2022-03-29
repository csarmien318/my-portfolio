import React from "react";
import PropTypes from "prop-types";
import Paginate from "./Paginate";
import SongsTableHeader from "./SongsTableHeader";
import styles from "../css/Songs.module.css";

const SongsTable = ({
  selectedArtist,
  pageNumber,
  setPageNumber,
  allSongs,
  setAllSongs,
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
    <div>
      <p style={{ padding: "12px 0 0 14px" }}>
        Showing {songs.length} songs in the database.
      </p>
      <div className={`table-responsive ${styles.divBox}`}>
        <table className={`table table-hover table-striped ${styles.tableBox}`}>
          <SongsTableHeader
            songs={songs}
            setAllSongs={setAllSongs}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
          />
          <tbody>{displaySongs}</tbody>
        </table>
      </div>
      <Paginate
        songs={songs}
        songsPerPage={songsPerPage}
        pageNumber={pageNumber}
        onPageChange={pageChange}
      />
    </div>
  );
};

export default SongsTable;

SongsTable.propTypes = {
  selectedArtist: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  allSongs: PropTypes.array.isRequired,
  setAllSongs: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  setSortColumn: PropTypes.func.isRequired,
};
