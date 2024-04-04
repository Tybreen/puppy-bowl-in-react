import { useEffect, useState } from "react";
import "./App.css";
import AllCards from "./components/AllCards";
import DetailedCard from "./components/DetailedCard";
import AddPlayerForm from "./components/AddPlayerForm";
import SearchBar from "./components/SearchBar";
import { Route, Routes } from "react-router-dom";

const cohortName = `2402-FTB-ET-WEB-FT`; // 2402-FTB-ET-WEB-FT
const BASE_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function App() {
  const [players, setPlayers] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState([]);
  const [needsUpdating, setNeedsUpdating] = useState(true);
  const [fetchSuccess, setFetchSuccess] = useState(null);

  useEffect(() => {
    if (needsUpdating) {
      fetchPlayers();
      setNeedsUpdating(false);
    }
  }, [needsUpdating]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/players`);
      const json = await response.json();

      setPlayers(json.data.players);
      setDisplayPlayers(json.data.players);
      setFetchSuccess(json.success);
    } catch (error) {
      console.error(`Error occurred!\n----------------\n`, error);
      setFetchSuccess(false);
    }
  };

  return (
    <>
      <header>
        <h1 id="title" className="backgroundText">
          Puppy Bowl in React
        </h1>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPlayerForm BASE_API_URL={BASE_API_URL} setNeedsUpdating={setNeedsUpdating} />

                <SearchBar players={players} setDisplayPlayers={setDisplayPlayers} />

                {displayPlayers.length ? (
                  <div id="allCardsBody">
                    <AllCards players={displayPlayers} setNeedsUpdating={setNeedsUpdating} BASE_API_URL={BASE_API_URL} />
                  </div>
                ) : players.length ? (
                  <h2 className="backgroundText textCenter">Sorry. Nothing matches your search.</h2>
                ) : fetchSuccess === true ? (
                  <h2 className="backgroundText textCenter">No puppys... Create one!</h2>
                ) : fetchSuccess === false ? (
                  <h2 className="backgroundText textCenter">Failed! Sorry, please try again later.</h2>
                ) : (
                  <h2 className="backgroundText textCenter">Loading...</h2>
                )}
              </>
            }
          />
          <Route
            path="/:playerID"
            element={
              <div id="detailedCardBody">
                <DetailedCard setNeedsUpdating={setNeedsUpdating} players={players} />
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
