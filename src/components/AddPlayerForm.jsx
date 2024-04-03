import { useState } from "react";

const AddPlayerForm = ({ BASE_API_URL, setNeedsUpdating }) => {
  const [nameInput, setNameInput] = useState(``);
  const [breedInput, setBreedInput] = useState(``);
  const [inTheFieldInput, setInTheFieldInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(``);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let inTheFieldInput_String = `bench`;
    if (inTheFieldInput) inTheFieldInput_String = `field`;

    try {
      let fetchBody = {
        name: nameInput,
        breed: breedInput,
        status: inTheFieldInput_String
      };
      if (imageUrlInput) {
        fetchBody = {
          name: nameInput,
          breed: breedInput,
          status: inTheFieldInput_String,
          imageUrl: imageUrlInput
        };
      }

      const response = await fetch(`${BASE_API_URL}/players`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`
        },
        body: JSON.stringify(fetchBody)
      });

      const json = await response.json();

      if (json.success) alert(`${nameInput} was added to the Puppy Bowl.`);
      else alert(`Something went wrong`);

      setNeedsUpdating(true);

      setNameInput(``);
      setBreedInput(``);
      setImageUrlInput(``);
    } catch (error) {
      console.error(`Error occurred!\n----------------\n`, error);
    }
  };

  return (
    <form id="AddPlayerForm" onSubmit={handleSubmit}>
      <h2 className="backgroundText">Add a puppy!</h2>
      <section>
        <label className="backgroundText">Name:</label>
        <input type="text" value={nameInput} placeholder="Scruffy" onChange={(e) => setNameInput(e.target.value)} required />
      </section>

      <section>
        <label className="backgroundText">Breed:</label>
        <input type="text" value={breedInput} placeholder="German Shepherd" onChange={(e) => setBreedInput(e.target.value)} />
      </section>

      <section id="inFieldCheckbox">
        <label className="backgroundText">In the field: </label>
        <input
          type="checkbox"
          value={inTheFieldInput}
          onChange={(e) => {
            if (inTheFieldInput) setInTheFieldInput(false);
            else setInTheFieldInput(true);
          }}
        />
      </section>

      <section>
        <label className="backgroundText">Image url:</label>
        <input type="text" value={imageUrlInput} placeholder="url" onChange={(e) => setImageUrlInput(e.target.value)} />
      </section>

      <button className="pointer" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddPlayerForm;
