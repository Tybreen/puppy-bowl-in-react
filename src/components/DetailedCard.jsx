import { useNavigate, useParams } from "react-router-dom";

const DetailedCard = ({setNeedsUpdating, players}) => {

  const navigate = useNavigate();

  const {playerID} = useParams();
  
  const selectedPlayer = players.find((player) => player.id === Number(playerID));

  const findTeammates = () => {
    const teammates = players.filter((player) => selectedPlayer.teamId === player.teamId);
    return teammates.map((mate) => <li key={mate.id}>{mate.name}</li>);
  }

  return (
    selectedPlayer
    ?
    <section id="selectedCard">
      <img id="cardImg" src={selectedPlayer.imageUrl} alt={selectedPlayer.name}/>
      <h2 id="cardName">{selectedPlayer.name}</h2>
      <p id="cardId">#{selectedPlayer.id}</p>
      <h3 id="cardBreed">Breed: {selectedPlayer.breed}</h3>
      <h3 id="cardStatus">Status: {selectedPlayer.status}</h3>
      <h3 id="cardTeammates">Teammates:</h3>
      <ul>
        {findTeammates()}
      </ul>
      <button id="cardBackButton" onClick={() => {
        setNeedsUpdating(true);
        navigate("/");
      }}>Back</button>
    </section>
    :
    <h2 className="backgroundText">Loading</h2>
  )
}
export default DetailedCard;

//* <Link>to={`/`}></Link>