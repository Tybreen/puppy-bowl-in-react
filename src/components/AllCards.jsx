import { useNavigate } from "react-router-dom";

const AllCards = ({ players, setNeedsUpdating, BASE_API_URL }) => {
  const navigate = useNavigate();

  const deletePlayer = async (playerID) => {
    const playerName = players.find((player) => playerID === player.id).name;

    const confirmed = confirm(`ARE YOU SURE???\nDELETE ${playerName}!!!`);

    if (confirmed) {
      try {
        const response = await fetch(`${BASE_API_URL}/players/${playerID}`, { method: `DELETE` });
        const json = await response.json();

        if (json.success) alert(`${playerName} was deleted.`);
        else alert(`Something went wrong`);

        setNeedsUpdating(true);
      } catch (error) {
        console.error(`Error occurred!\n----------------\n`, error);
      }
    }
  };

  return players.map((player) => {
    return (
      <section
        key={player.id}
        className="card individualCard"
        onClick={(event) => {
          if (!event.target.className.includes(`deleteButton`)) {
            console.log(!event.target.className.includes(`deleteButton`));
            navigate(`/${player.id}`);
          }
        }}
      >
        <img id="cardImg" src={player.imageUrl} alt={player.name} />
        <h2 id="cardName">{player.name}</h2>
        <p id="cardId">#{player.id}</p>
        <h3 id="cardBreed">Breed: {player.breed}</h3>
        <h3 id="cardStatus">Status: {player.status}</h3>
        <button className="deleteButton pointer" onClick={() => deletePlayer(player.id)}>
          Delete
        </button>
      </section>
    );
  });
};

export default AllCards;
