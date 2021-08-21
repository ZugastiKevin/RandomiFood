import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Url from 'components/Url';
import Cookies from 'js-cookie';
import userEvent from '@testing-library/user-event';

const CreateRecipe = () => {
  const cookie = Cookies.get("token");
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("test");
  const [mesureValue, setMesureValue] = useState(1);
  const [mesure, setMesure] = useState("gramme");

  const dataRecipe = {
    title: title,
    description: description,
    multipleingredients:[{
      ingredient: ingredient,
      mesureValue: mesureValue,
      mesure: mesure,
    }]
  };

  const updateChange = (payload) => {
    fetch(`${Url()}recettes`,{
      method:'POST',
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .catch(err => console.error(err));
  };

  const handleFetch = (e) => {
    e.preventDefault();
    updateChange(dataRecipe);
    //history.push(`/recettes`);
  };

  return (
    <div>
      <form onSubmit={handleFetch}>
        <label htmlFor="title"> Nom de la recette:
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <label htmlFor="description"> Déscription de la recette:
          <textarea type="textarea" rows="5" cols="33" name="description" onChange={(e) => setDescription(e.target.value)}/>
        </label>
        <input type="submit" value="Enregistré la recette" />
      </form>
    </div>
  );
};

export default CreateRecipe;