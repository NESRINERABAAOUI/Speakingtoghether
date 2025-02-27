import PropTypes from "prop-types";
import "../styles/DevisCard.scss";
import franceImg from "../assets/images/france.png";
import italienImg from "../assets/images/italy.png";
import englishImg from "../assets/images/usa.png";
import germanImg from "../assets/images/germany.png";

function DevisCard({ src, language, description }) {
  return (
    <div className="devisCard-container">
      <img
        src={
          src === "frensh"
            ? franceImg
            : src === "english"
              ? englishImg
              : src === "italien"
                ? italienImg
                : germanImg
        }
        alt="fr"
      />
      <div>
        <h4>{language.toUpperCase()}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

DevisCard.propTypes = {
  src: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DevisCard;
