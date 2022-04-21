import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "../components/Page";
import SongsListGroup from "../components/SongsListGroup";
import SongsTable from "../components/SongsTable";
import { Col, Container, Row, Placeholder } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

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

  const { handleLogout } = useAuth();

  useEffect(() => {
    async function getSongsData() {
      let mounted = true;
      setLoader(true);
      await axios
        .get("http://localhost:8080/api/songs", {
          withCredentials: true,
        })
        .then((response) => {
          if (mounted) {
            const { data } = response;
            setAllSongs(data);
            setApiSongs(data);
            setLoader(false);
          }
        })
        .catch((err) => {
          if (mounted) {
            const status = err?.response.status;
            setLoader(false);
            console.log(err);
            if (status === 401 || status === 403) {
              alert("Unauthorized");
            }
            if (status === 400) {
              alert("Unauthorized");
              handleLogout();
            } else {
              alert("An internal server error occurred.");
              handleLogout();
            }
          }
        });
      return () => {
        mounted = false;
      };
    }
    getSongsData();
  }, []);

  useEffect(() => {
    setAllSongs(getApiSongs);
    setPageNumber(0);
    setSortColumn({ path: "", order: "ascending" });
  }, [selectedArtist]);

  return (
    <Page title="Tabled Data">
      <Container fluid style={{ maxWidth: "2000px" }}>
        <Row>
          {loader && (
            <Placeholder as="p" animation="glow">
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
