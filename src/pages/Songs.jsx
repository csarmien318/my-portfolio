import React, { useState, useEffect } from "react";
import { Page } from "../components/Page";
import { SongsListGroup } from "../components/SongsListGroup";
import { SongsTable } from "../components/SongsTable";
import SongData from "../songService.json";
import { Col, Container, Row } from "react-bootstrap";

const Songs = () => {
  const [allSongs, setAllSongs] = useState(SongData);
  const [selectedArtist, setSelectedArtist] = useState("All Artists");
  const [pageNumber, setPageNumber] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "ascending",
  });

  useEffect(() => {
    setPageNumber(0);
    setAllSongs(SongData);
    setSortColumn({ path: "", order: "ascending" });
  }, [selectedArtist]);

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
