import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Url from "components/Url";
import Cookies from 'js-cookie';

const RecipeEdit = () => {
  const cookie = Cookies.get("token");
  const { recipeSlug } = useParams();
  const history = useHistory();

  const [recipeContent, setRecipeContent] = useState('');
  const [mesureContent, setMesureContent] = useState('');

  const [dataRecipe, setDataRecipe] = useState({
    title: recipeContent.title,
    description: recipeContent.description,
    multipleingredients:[{
      id: recipeContent.id,
      ingredient: recipeContent.ingredient,
      mesureValue: recipeContent.mesureValue,
    }]
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setDataRecipe({
      ...dataRecipe,
      [e.target.name]: e.target.value,
      multipleingredients:[{
        [e.target.name]: e.target.value
      }]
    });
  };

  const findRecipe = () => {
    fetch(`${Url()}recettes/${recipeSlug}`,{
      method:'GET',
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((response) => response.json())
    .then((infosRecipe) => {
      setRecipeContent(infosRecipe);
      })
    .catch(err => console.error(err));
  };

  const findMesure = () => {
  };

  const updateChange = (payload) => {
    fetch(`${Url()}recettes/${recipeSlug}`,{
      method:'PUT',
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .catch(err => console.error(err));
  };

  const deleteRecipe = () => {
    fetch(`${Url()}recettes/${recipeSlug}`,{
      method:'DELETE',
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((response) => response.json())
    .catch(err => console.error(err));
  };

  const updateFetch = () => {
    updateChange(dataRecipe);
    //history.push(`/recettes`);
  };

  const deleteFetch = () => {
    deleteRecipe();
    history.push(`/recettes`);
  };

  useEffect(() => {
    findRecipe();
    findMesure();
    // eslint-disable-next-line
  }, []);
  console.log(mesureContent);

  return (
    <>
      {recipeContent ?
        <div>
          <form onSubmit={updateFetch}>
            <label htmlFor="title"> Nom de la recette:
              <input type="text" name="title" placeholder={recipeContent.title} onChange={handleChanges}/>
            </label>
            <label htmlFor="description"> Déscription de la recette:
              <textarea type="textarea" rows="5" cols="33" name="description" placeholder={recipeContent.description} onChange={handleChanges}/>
            </label>
            <ul>
              {recipeContent.multipleingredients && recipeContent.multipleingredients.map((ingredients) => {
                return (
                  <li key={uuidv4()}>
                    <label htmlFor="ingredient"> Ingrédient:
                      <input type="text" name="ingredient" placeholder={ingredients.ingredient} onChange={handleChanges} />
                    </label>,
                    <label htmlFor="mesureValue"> Quantité:
                      <input type="float" name="mesureValue" placeholder={ingredients.mesureValue} onChange={handleChanges} />
                    </label>
                    <label htmlFor="mesure"> Choissisez votre unité de mesure:
                      <select id="selected-mesure" name="mesure" onChange={""}>
                        <option>?</option>
                        {mesureContent && mesureContent.map((allMesure) => {
                          return(<option value={allMesure.mesure}></option>)
                        })}
                      </select>
                    </label>
                  </li>
                )
              })}
            </ul>
            <input type="submit" value="Enregistré les changements" />
          </form>
          <button onClick={deleteFetch}>X</button>
        </div>
        :
        <>
          <p>Nothing</p>
        </>
      }
    </>
  );
};

export default RecipeEdit;