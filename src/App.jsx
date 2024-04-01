import { useEffect, useState } from 'react'
import './App.css'
import AllCards from './components/AllCards'; /////* I have no idea why there's an error here OR how do you fix it, Don't worry, it's fully functional it just gives a red squiggly line. (I would love to know thou)
import DetailedCard from './components/DetailedCard';
import AddPlayerForm from './AddPlayerForm';

const cohortName = `2402-FTB-ET-WEB-FT-TESTING`; // 2402-FTB-ET-WEB-FT-TESTING
const BASE_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function App() {

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [needsUpdating, setNeedsUpdating] = useState(false);

  useEffect(() => {
    if(selectedPlayer === null || needsUpdating) {
      fetchPlayers();
      setNeedsUpdating(false);
    }

  }, [selectedPlayer, needsUpdating]);


  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/players`);
      const json = await response.json();
      setPlayers(json.data.players);
    }
    catch (error) {
      console.error(`Error occurred!\n----------------\n`, error);
    }
  }

  const fetchSinglePlayer = async (playerID, event) => {

    if(event.target.className !== `deleteButton`) {
      try {
        const response = await fetch(`${BASE_API_URL}/players/${playerID}`);
        const json = await response.json();
        setSelectedPlayer(json.data.player);
      }
      catch (error) {
        console.error(`Error occurred!\n----------------\n`, error);
      }
    }
  }
  
  return (
    <>
      <header>
        <h1 id="title">Puppy Bowl in React</h1>
      </header>
      
      <main>
        {selectedPlayer
          ?
          <div id="detailedCardBody">
            <DetailedCard selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} players={players}/>
          </div>
          :
          <>
            <AddPlayerForm BASE_API_URL={BASE_API_URL} setNeedsUpdating={setNeedsUpdating}/>
            <div id="allCardsBody">
              <AllCards players={players} fetchSinglePlayer={fetchSinglePlayer} setNeedsUpdating={setNeedsUpdating} BASE_API_URL={BASE_API_URL}/>
            </div>
            </>
        }
      </main>

    </>
  )
}

export default App
