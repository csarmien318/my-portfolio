import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import ArtistData from "../artistService.json";

export const SongsListGroup = ({ onArtistSelect, selectedArtist }) => {
  const artists = ArtistData;

  return (
    <ListGroup as="ul" style={{ minWidth: "fit-content" }}>
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

SongsListGroup.propTypes = {
  onArtistSelect: PropTypes.func.isRequired,
  selectedArtist: PropTypes.string.isRequired,
};
