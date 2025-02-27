import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.scss";
import { registedUser } from "../services/connection";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [language, setLanguage] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await registedUser({
        Email: email,
        RoleUser: roleUser,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        NumberPhone: number,
        Language: language,
      });
      navigate("/login");
    } catch (error) {
      console.error("erreur ",error.message);
      if (
        error.error &&
        error.response.data.message === "Email already exits "
      ) {
        alert("l'Email est déjà utilisé.veuillez essayer avec un autre.");
      } else {
        alert("Une erreur est survenue .Veuillez reéssayer");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h1 className="register-title">Créer un Nouveau Compte</h1>
        <div className="input-containers">
          <div>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="input-field"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
              required
            />
            <input
              className="input-field"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
              required
            />
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>
          <div>
            <label className="role-label">
              Choisissez votre rôle :
              <select
                value={roleUser}
                onChange={(e) => setRoleUser(e.target.value)}
                className="role-select"
                required
              >
                <option value="C">Client</option>
                <option value="T">Traducteur</option>
              </select>
            </label>
            <input
              className="input-field"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Numéro de téléphone"
            />
            <input
              className="input-field"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Langue du traducteur"
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
