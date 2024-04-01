const DetailedCard = ({selectedPlayer, setSelectedPlayer, players}) => {

  const findTeammates = () => {
    const teammates = players.filter((player) => selectedPlayer.teamId === player.teamId);
    return teammates.map((mate) => <li key={mate.id}>{mate.name}</li>);
  }

  return (
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
      <button id="cardBackButton" onClick={() => setSelectedPlayer(null)}>Back</button>
    </section>
  )
}
export default DetailedCard;