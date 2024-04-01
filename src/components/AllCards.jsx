const AllCards = ({players, fetchSinglePlayer, setNeedsUpdating, BASE_API_URL}) => {

  const deletePlayer = async (playerID) => {

    const playerName = players.find((player) => playerID === player.id).name;

    const confirmed = confirm(`Are you sure???\nDelete ${playerName}!`);
    
    if(confirmed) {
      try {
        const response = await fetch(`${BASE_API_URL}/players/${playerID}`, {method: `DELETE`});
        const json = await response.json();
        setNeedsUpdating(true);
      }
      catch (error) {
        console.error(`Error occurred!\n----------------\n`, error);
      }
    }
  }

  return (
    
    players.map((player) => {
      return (
        <section key={player.id} className="individualCard" onClick={(event) => fetchSinglePlayer(player.id, event)}>
          <img id="cardImg" src={player.imageUrl} alt={player.name}/>
          <h2 id="cardName">{player.name}</h2>
          <p id="cardId">#{player.id}</p>
          <h3 id="cardBreed">Breed: {player.breed}</h3>
          <h3 id="cardStatus">Status: {player.status}</h3>
          <button className="deleteButton" onClick={() => deletePlayer(player.id)}>Delete</button>
        </section>
      )
    })
  )
}

export default AllCards;