import "../styles/Profile.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import avatarImg from "../assets/images/profile.jpg";

function Item({ name, role }) {
  if (role && role.charAt(0) !== "T") return null;
  return <div className="language-badge">{name}</div>;
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);

  useEffect(() => {
    const profileUser = localStorage.getItem("Profile_User");
    const role = localStorage.getItem("Role_User");
    if (profileUser) setUser(JSON.parse(profileUser));
    setRoleUser(role);
  }, []);

  const roleMapping = {
    C: "Client",
    T: "Traducteur",
    A: "Administrateur",
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <img src={avatarImg} alt="Default Avatar" className="avatar" />
          <h2 className="session-message">Votre session est fermée. Veuillez vous reconnecter.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h2>Informations du profil</h2>
        </header>

        <div className="profile-content">
          <div className="info-group">
            <label>Prénom</label>
            <p className="info-value">{user.firstName}</p>
          </div>

          <div className="info-group">
            <label>Nom</label>
            <p className="info-value">{user.lastName}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p className="info-value">{user.email}</p>
          </div>

          <div className="info-group">
            <label>Téléphone</label>
            <p className="info-value">{user.phoneNumber}</p>
          </div>

          <div className="role-section">
            <span className="role-label">Rôle :</span>
            <span className="role-value">{roleMapping[roleUser] || "Inconnu"}</span>
          </div>

          {user.Language && <Item name={user.Language} role={roleUser} />}

          <Link to="/modifProfile" className="edit-button">
            <span className="icon">✏️</span>
            Modifier mes informations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;