import { useState } from "react";

const AddPlayerForm = ({BASE_API_URL, setNeedsUpdating}) => {

  const [nameInput, setNameInput] = useState(``);
  const [breedInput, setBreedInput] = useState(``);
  const [imageUrlInput, setImageUrlInput] = useState(``);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_API_URL}/players`, 
      {
        method: `POST`,
        headers: {"Content-Type": `application/json`},
        body: JSON.stringify({
          name: nameInput,
          breed: breedInput,
          imageUrl: imageUrlInput
        })
      });
      const json = await response.json();
      setNeedsUpdating(true);

      setNameInput(``);
      setBreedInput(``);
      setImageUrlInput(``);
      
    }
    catch (error) {
      console.error(`Error occurred!\n----------------\n`, error);
    }

  }

  return (

    <form id="AddPlayerForm" onSubmit={handleSubmit}>
      
      <label className="backgroundText">Puppy's name:</label>
      <input type="text" value={nameInput} placeholder="Scruffy" onChange={(e) => setNameInput(e.target.value)} required/>

      <label className="backgroundText">Puppy's breed:</label>
      <input type="text" value={breedInput} placeholder="German Shepherd" onChange={(e) => setBreedInput(e.target.value)}/>
      
      <label className="backgroundText">Puppy's image url:</label>
      <input type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}/>

      <button type="submit">Submit</button>
    </form>

  )
}

export default AddPlayerForm;