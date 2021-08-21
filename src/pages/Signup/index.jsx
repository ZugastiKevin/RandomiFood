import { useHistory, Link } from 'react-router-dom';
import React, { useState} from 'react';
import { useFetchUserCreate } from 'Hooks/useFetch';

const Signup = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  
  const CreateDataUser = {
    email: email,
    username: username,
    password: password
  };

  const { doFetch: createUser } = useFetchUserCreate("POST", CreateDataUser);

  const handleFetch = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        console.log("Les mots de passe ne correspondent pas.");
    } else {
      createUser("users");
      history.push("/");
    };
  };

  return (
    <div className="signup">
      <h2>Créer un compte</h2>
      <form onSubmit={handleFetch}>
        <div className="form-user">
          <label className="label-email">Email</label>
          <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-user">
          <label className="label-username">Pseudonyme</label>
          <input type="username" value={username} required onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-user">
          <label className="label-password">Mot de passe</label>
          <input type="password" minLength="8" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-user">
          <label className="label-confirm-password">Confirmation du mot de passe</label>
          <input type="password" minLength="8" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <Link className="link-signin" to="/se-connecter">Se connecter</Link>
        <input type="submit" value="Inscription" />
      </form>
    </div>
  );
};

export default Signup;
