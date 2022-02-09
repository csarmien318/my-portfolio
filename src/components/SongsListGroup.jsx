import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import ArtistData from "../artistService.json";

export const SongsListGroup = ({ onArtistSelect, selectedArtist }) => {
  const artists = ArtistData;

  return (
    <ListGroup as="ul">
      {artists.map((artist) => (
        <ListGroup.Item
          active={selectedArtist === artist.name ? true : false}
          onClick={() => onArtistSelect(artist.name)}
          key={artist._id}
          as="li"
          style={{ cursor: "pointer", backgroundColor: "rgb(199, 190, 190)" }}
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
