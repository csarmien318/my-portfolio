import React from "react";
import PropTypes from "prop-types";

export const SongsTableHeader = ({
  songs,
  setAllSongs,
  order,
  setOrder,
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
    if (order === "ascending") {
      const sorted = [...songs].sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
      setAllSongs(sorted);
      setOrder("descending");
      setSortColumn({ path: column, order: "descending" });
    }
    if (order === "descending") {
      const sorted = [...songs].sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
      setAllSongs(sorted);
      setOrder("ascending");
      setSortColumn({ path: column, order: "ascending" });
    }
  };

  const displaySortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "ascending")
      return <i className="fa fa-sort-desc" />;
    else return <i className="fa fa-sort-asc" />;
  };

  return (
    <thead>
      <tr style={{ cursor: "pointer" }}>
        {columns.map((column) => (
          <th
            scope="col"
            key={column.path}
            onClick={() => handleSort(column.path)}
          >
            {column.label} {displaySortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

SongsTableHeader.propTypes = {
  songs: PropTypes.array.isRequired,
  setAllSongs: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
  setSortColumn: PropTypes.func.isRequired,
};
