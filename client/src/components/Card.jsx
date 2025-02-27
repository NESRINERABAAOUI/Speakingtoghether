import PropTypes from "prop-types";
import "../styles/Card.scss";

function Card({name, type }) {
  return (
    <div>
      {/* <img className="card-img" src={img} alt="img" /> */}
      <div>
      <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
              <p>{type}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  // img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
