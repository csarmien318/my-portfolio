import React from "react";
import ArtistData from "../artistService.json";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import styles from "../css/Songs.module.css";

const SongsListGroup = ({ onArtistSelect, selectedArtist }) => {
  const artists = ArtistData;

  return (
    <ListGroup as="ul" className={styles.listGroup}>
      {artists.map((artist) => (
        <ListGroup.Item
          action
          variant="light"
          active={selectedArtist === artist.name ? true : false}
          onClick={() => onArtistSelect(artist.name)}
          key={artist._id}
          style={{ cursor: "pointer" }}
          as="li"
        >
          {artist.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SongsListGroup;

SongsListGroup.propTypes = {
  onArtistSelect: PropTypes.func.isRequired,
  selectedArtist: PropTypes.string.isRequired,
};
