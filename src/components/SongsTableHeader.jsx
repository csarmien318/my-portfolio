import React from "react";
import PropTypes from "prop-types";

const SongsTableHeader = ({
  songs,
  setAllSongs,
  sortColumn,
  setSortColumn,
}) => {
  const columns = [
    { path: "title", label: "Song" },
    { path: "artist", label: "Artist" },
    { path: "album", label: "Album" },
    { path: "songLength", label: "Length" },
    { path: "releaseYear", label: "Year Released" },
  ];

  const handleSort = (column) => {
    var order = column !== sortColumn.path ? "ascending" : sortColumn.order;
    if (order === "ascending") {
      const sorted = [...songs].sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
      setAllSongs(sorted);
      setSortColumn({ path: column, order: "descending" });
    }
    if (order === "descending") {
      const sorted = [...songs].sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
      setAllSongs(sorted);
      setSortColumn({ path: column, order: "ascending" });
    }
  };

  const displaySortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "ascending")
      return <i className="fa fa-sort-desc" />;
    else return <i className="fa fa-sort-asc" />;
  };

  const handleStyle = (column) => {
    if (column.label === "Song") return { width: "300px" };
    if (column.label === "Artist") return { width: "140px" };
    if (column.label === "Album") return { width: "220px" };
    if (column.label === "Length") return { width: "130px" };
    if (column.label === "Year Released") return { width: "140px" };
  };

  return (
    <thead>
      <tr style={{ cursor: "pointer" }}>
        {columns.map((column) => (
          <th
            key={column.path}
            style={handleStyle(column)}
            onClick={() => handleSort(column.path)}
          >
            {column.label} {displaySortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default SongsTableHeader;

SongsTableHeader.propTypes = {
  songs: PropTypes.array.isRequired,
  setAllSongs: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  setSortColumn: PropTypes.func.isRequired,
};
