import React, { useState, useEffect } from "react";
import { Col, Container, Row, Placeholder } from "react-bootstrap";
import axios from "axios";
import Page from "../components/Page";
import SongsListGroup from "../components/SongsListGroup";
import SongsTable from "../components/SongsTable";
import styles from "../css/Songs.module.css";

const Songs = () => {
  const [getApiSongs, setApiSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("All Artists");
  const [pageNumber, setPageNumber] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "ascending",
  });

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    async function getSongsData() {
      setLoader(true);
      try {
        const response = await axios.get(`${API_ENDPOINT}/songs`, {
          withCredentials: true,
        });
        const { data } = response;
        setAllSongs(data);
        setApiSongs(data);
        setLoader(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    getSongsData();
  }, [setAllSongs]);

  useEffect(() => {
    setAllSongs(getApiSongs);
    setPageNumber(0);
    setSortColumn({ path: "", order: "ascending" });
  }, [selectedArtist]);

  return (
    <Page title="Tabled Data">
      <Container
        fluid
        className={styles.container}
        style={{ maxWidth: "2000px" }}
      >
        <Row>
          {loader && (
            <Placeholder data-testid="loaderImg" as="p" animation="glow">
              <Placeholder xs={12} bg="dark" size="lg" />
            </Placeholder>
          )}
          {!loader && (
            <>
              <Col xs={3} md={2}>
                <SongsListGroup
                  data-testid="songsListGroup"
                  onArtistSelect={setSelectedArtist}
                  selectedArtist={selectedArtist}
                />
              </Col>
              <Col xs={9} md={10}>
                <SongsTable
                  data-testid="songsTable"
                  allSongs={allSongs}
                  setAllSongs={setAllSongs}
                  selectedArtist={selectedArtist}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  sortColumn={sortColumn}
                  setSortColumn={setSortColumn}
                />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </Page>
  );
};

export default Songs;
