
import { useHistory, Link } from 'react-router-dom';
import React, { useState} from 'react';
import { useFetchUserLog } from 'Hooks/useFetch';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  const LogDataUser = {
    identifier: email,
    password: password
  };

  const { doFetch: logUser } = useFetchUserLog("POST", LogDataUser);

  const handleFetch = (e) => {
    e.preventDefault();
    logUser("auth/local");
    history.push("/");
  }

  return (
    <div className = "signin">
      <h2>Se connecter</h2>
      <form onSubmit={handleFetch}>
        <div className="form-user">
          <label className="label-email">Email</label>
          <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-user">
          <label className="label-password">Mot de passe</label>
          <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Link className="link-signup" to="/inscription">S'inscrire</Link>
        <input type="submit" value="Connexion" />
      </form>
    </div>
  );
};

export default Signin;
