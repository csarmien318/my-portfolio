import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import styles from "../css/Pagination.module.css";

export const Paginate = ({ pageNumber, songs, songsPerPage, onPageChange }) => {
  const pageCount = Math.ceil(songs.length / songsPerPage);
  if (pageCount === 1) return null;
  let active = pageNumber;
  let items = [];
  for (let number = 0; number < pageCount; number++) {
    items.push(
      <PageItem
        key={number}
        active={number === active}
        onClick={() => onPageChange(number)}
      >
        {number + 1}
      </PageItem>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination className={`${styles.pagination}`}>{items}</Pagination>
      <br />
    </div>
  );

  return paginationBasic;
};

Paginate.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  songs: PropTypes.array.isRequired,
  songsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
