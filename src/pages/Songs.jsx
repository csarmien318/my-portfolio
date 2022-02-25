import React, { useState, useEffect } from "react";
import { Page } from "../components/Page";
import { SongsListGroup } from "../components/SongsListGroup";
import { SongsTable } from "../components/SongsTable";
import SongData from "../songService.json";

const Songs = () => {
  const [allSongs, setAllSongs] = useState(SongData);
  const [selectedArtist, setSelectedArtist] = useState("All Artists");
  const [pageNumber, setPageNumber] = useState(0);
  const [order, setOrder] = useState("ascending");
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "ascending",
  });

  useEffect(() => {
    setPageNumber(0);
    setAllSongs(SongData);
    setOrder("ascending");
    setSortColumn({ path: "", order: "ascending" });
  }, [selectedArtist]);

  return (
    <Page title="Tabled Data">
      <div className="row">
        <div className="col-2">
          <SongsListGroup
            onArtistSelect={setSelectedArtist}
            selectedArtist={selectedArtist}
          />
        </div>
        <div className="col table-responsive">
          <SongsTable
            allSongs={allSongs}
            setAllSongs={setAllSongs}
            selectedArtist={selectedArtist}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            order={order}
            setOrder={setOrder}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
          />
        </div>
      </div>
    </Page>
  );
};

export default Songs;
