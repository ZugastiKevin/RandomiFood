import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Recipes from 'pages/Recipes';
import Recipe from 'pages/Recipe';
import RecipeEdit from 'pages/RecipeEdit';
import CreateRecipe from 'pages/CreateRecipe';
import Home from 'pages/Home';

const AppRoute = () => {
  return (
    <Router>
      <main>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/inscription" exact>
            <Signup />
          </Route>
          <Route path="/se-connecter" exact>
            <Signin />
          </Route>
          <Route path="/recettes" exact>
            <Recipes />
          </Route>
          <Route path="/recette/cree" exact>
            <CreateRecipe />
          </Route>
          <Route path="/recette/:recipeSlug" exact>
            <Recipe />
          </Route>
          <Route path="/recette/edition/:recipeSlug" exact>
            <RecipeEdit />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default AppRoute;