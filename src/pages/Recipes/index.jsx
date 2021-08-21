import React, { useEffect } from 'react';
import { useFetch } from 'Hooks/useFetch';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Recipes = () => {
    
  const { data: allRecipes, doFetch: findAllRecipes } = useFetch();

  useEffect(() => {
    findAllRecipes("recettes");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Toutes les recettes</h1>
      <>
        {allRecipes ?
          <>
            {allRecipes && allRecipes.map((recipe) => {
              return (
                <div key={uuidv4()}>
                  <ul>
                    <li><Link to={`recette/${recipe.id}`}>{recipe.title}</Link></li>
                  </ul>
                </div>
              )
            })}
          </>
          :
          <>
            <p>Nothing</p>
          </>
        }
      </>
    </div>
  );
};

export default Recipes;