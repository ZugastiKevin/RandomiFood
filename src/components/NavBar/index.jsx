import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
  const logged = useSelector(state => state.logReducer.logged);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(Cookies.get('id'))
  }, [logged])

  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    window.location.href = '/';
    return false;
  };

  return (
    <div>
      <Link className="link-home" to="/">Randomifood</Link>
      {logged ?
          <>
            <Link className="link-all-recipes" to="/recettes" >Toutes les Recettes</Link>
            <Link className="link-create-recipe" to="/recette/cree" >Crée une Recette</Link>
            <Link className="link-logout" to="/" onClick={handleLogOut}>Se Deconnecter</Link>
          </>
        :
          <>
            <Link className="link-signup" to="/inscription">S'inscrire</Link>
            <Link className="link-signin" to="/se-connecter">Se Connecter</Link>
          </>
      }
    </div>
  );
};

export default NavBar;