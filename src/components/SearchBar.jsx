import { useEffect, useState } from "react";

const SearchBar = ({ players, setDisplayPlayers }) => {
  const [searchParameter, setSearchParameter] = useState(``);

  useEffect(() => {
    // If the input is a string
    if (isNaN(Number(searchParameter))) {
      setDisplayPlayers(players.filter((player) => player.name.toLowerCase().includes(searchParameter)));
    }
    // If the input is a number
    else {
      setDisplayPlayers(players.filter((player) => String(player.id).includes(searchParameter)));
    }
  }, [searchParameter]);

  return (
    <form id="searchBar">
      <label className="backgroundText">Search Bar</label>
      <input type="text" placeholder="Name/ID" onChange={(e) => setSearchParameter(e.target.value.toLowerCase())} />
    </form>
  );
};
export default SearchBar;
