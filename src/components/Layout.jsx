import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TableData } from "./TableData";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [character, setCharacter] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [tableSelected, setTableSelected] = useState("");

  const navigate = useNavigate();

  const typeUser = useRef(localStorage.getItem("isAuthenticated") || "");

  const getCharacter = async () => {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    setCharacter(data.results);
  };
  const getLocations = async () => {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/location"
    );
    setLocations(data.results);
  };

  const getEpisodes = async () => {
    const { data } = await axios.get("https://rickandmortyapi.com/api/episode");
    setEpisodes(data.results);
  };

  useEffect(() => {
    if (typeUser.current === "admin") {
      getCharacter();
      getLocations();
    }
    if (typeUser.current === "user") {
      getCharacter();
      getEpisodes();
    }
  }, [typeUser]);

  const endSession = () => {
    localStorage.removeItem("isAuthenticated");
    setCharacter([]);
    setLocations([]);
    setEpisodes([]);
    setTableSelected("");
    navigate("/");
  };

  return (
    <>
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            onClick={() => setTableSelected("character")}
          >
            Show Character
          </Button>
        </Grid>
        {typeUser.current === "admin" && (
          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={() => setTableSelected("locations")}
            >
              Show Locations
            </Button>
          </Grid>
        )}
        {typeUser.current === "user" && (
          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={() => setTableSelected("episodes")}
            >
              Show Episodes
            </Button>
          </Grid>
        )}
        <Grid item xs={6} display={"flex"} justifyContent={"end"}>
          <Button variant="outlined" onClick={() => endSession()}>
            Logout
          </Button>
        </Grid>
      </Grid>

      {character.length && tableSelected === "character" ? (
        <>
          <Typography variant="h2" color="initial" align="center">
            Character table
          </Typography>
          <TableData data={character} />
        </>
      ) : null}
      {locations.length && tableSelected === "locations" ? (
        <>
          <Typography variant="h2" color="initial" align="center">
            Locations table
          </Typography>
          <TableData data={locations} />
        </>
      ) : null}
      {episodes.length && tableSelected === "episodes" ? (
        <>
          <Typography variant="h2" color="initial" align="center">
            Episodes table
          </Typography>
          <TableData data={episodes} />
        </>
      ) : null}

      {tableSelected === "" && (
        <Typography variant="h5" color="initial" align="center" sx={{ py: 2 }}>
          Select table
        </Typography>
      )}
    </>
  );
}

export default Layout;
