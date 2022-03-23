import React, { useState, useEffect } from "react";
import axios from "axios";
import { Page } from "../components/Page";
import { SongsListGroup } from "../components/SongsListGroup";
import { SongsTable } from "../components/SongsTable";
import { Col, Container, Row } from "react-bootstrap";

const Songs = () => {
  const [getApiSongs, setApiSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("All Artists");
  const [pageNumber, setPageNumber] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "ascending",
  });

  useEffect(() => {
    getSongsData();
  }, []);

  useEffect(() => {
    setAllSongs(getApiSongs);
    setPageNumber(0);
    setSortColumn({ path: "", order: "ascending" });
  }, [selectedArtist]);

  const getSongsData = () => {
    axios
      .get("/api/songs")
      .then((response) => {
        const songsData = response.data;
        setAllSongs(songsData);
        setApiSongs(songsData);
        console.log("Songs data has been received");
      })
      .catch(() => {
        alert(
          "The table was not populated with songs because there was an error retrieving the data."
        );
      });
  };

  return (
    <Page title="Tabled Data">
      <Container fluid style={{ maxWidth: "2000px" }}>
        <Row>
          <Col xs={3} md={2}>
            <SongsListGroup
              onArtistSelect={setSelectedArtist}
              selectedArtist={selectedArtist}
            />
          </Col>
          <Col xs={9} md={10}>
            <SongsTable
              allSongs={allSongs}
              setAllSongs={setAllSongs}
              selectedArtist={selectedArtist}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              sortColumn={sortColumn}
              setSortColumn={setSortColumn}
            />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Songs;
