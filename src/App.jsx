import { Box, Button, Grid, Typography } from "@mui/material";
import "./App.css";
import { Login } from "./components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import { TableData } from "./components/TableData";

function App() {
  const [typeUser, setTypeUser] = useState(null);
  const [character, setCharacter] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [tableSelected, setTableSelected] = useState("");

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
    if (typeUser === "admin") {
      getCharacter();
      getLocations();
    }
    if (typeUser === "user") {
      getCharacter();
      getEpisodes();
    }
  }, [typeUser]);

  const endSession = () => {
    setTypeUser(null);
    setCharacter([]);
    setLocations([]);
    setEpisodes([]);
    setTableSelected("");
  };

  if (typeUser === null) return <Login setTypeUser={setTypeUser} />;
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
        {typeUser === "admin" && (
          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={() => setTableSelected("locations")}
            >
              Show Locations
            </Button>
          </Grid>
        )}
        {typeUser === "user" && (
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

export default App;
