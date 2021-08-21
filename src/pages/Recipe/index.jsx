import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFetch } from 'Hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const Recipe = () => {
  const [userId] = useState(Cookies.get('id'));
  const { recipeSlug } = useParams();
  const history = useHistory();

  const editRecipe = () => {
    history.push(`edition/${recipeSlug}`)
  }
    
  const { data: resultRecipe, doFetch: findRecipe } = useFetch();

  useEffect(() => {
    findRecipe(`recettes/${recipeSlug}`);
    // eslint-disable-next-line
  }, []);
  console.log(resultRecipe);

  return (
    <>
      {resultRecipe ?
        <>
          <div key={uuidv4()}>
            <h1>{resultRecipe.title}</h1>
            <p>{resultRecipe.description}</p>
            <ul>
              {resultRecipe.multipleingredients && resultRecipe.multipleingredients.map((ingredients) => {
                return (
                  <li key={uuidv4()}>{ingredients.ingredient}, {ingredients.mesureValue} {ingredients.mesure}</li>
                )
              })}
            </ul>
            {resultRecipe.author.id === parseInt(userId) ? <button className="btn-modify" onClick={editRecipe}>Modifier</button> : ""}
          </div>
        </>
        :
        <>
          <p>Nothing</p>
        </>
      }
    </>
  );
};

export default Recipe;