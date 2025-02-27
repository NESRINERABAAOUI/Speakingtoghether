/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from "react";
import "../styles/Traducteur.scss";
import Card from "../components/Card";
import trad1 from "../assets/images/1.jpg";
import trad2 from "../assets/images/2.jpg";
import trad3 from "../assets/images/3.jpg";
import trad4 from "../assets/images/4.jpeg";
import france from "../assets/images/france.png";
import italy from "../assets/images/italy.png";
import usa from "../assets/images/usa.png";
import germany from "../assets/images/germany.png";
import headerImg from "../assets/images/im1.jpg";
import { getTranslators } from "../services/trasnlators";
import permis from "../assets/images/documents/permis.png";
import diplome from "../assets/images/documents/diplome.jpg";
import naissance from "../assets/images/documents/naissance.jpg";
import note from "../assets/images/documents/note.jpg";
import famille from "../assets/images/documents/famille.jpg";
import medical from "../assets/images/documents/medical.jpg";
import CardDocument from "../components/CardDocument";

export default function Traducteur() {
  const [traduction, setTraduction] = useState({
    from: "Francais",
    to: "Anglais",
    traducteur: 0,
    name: "Maitre Jenny Wilson",
  });

  const [traducteurs, setTraducteurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trads = await getTranslators();
      setTraducteurs(trads);
    };
    fetchData();
  }, []);

  const getFlag = (value) => {
    if (value === "Francais") {
      return france;
    }
    if (value === "Anglais") {
      return usa;
    }
    if (value === "Italien") {
      return italy;
    }
    if (value === "Allemand") {
      return germany;
    }
    return france;
  };

  const handleCardClick = (trad) => {
    setTraduction({
      ...traduction,
      traducteur: trad.Id_Translator,
    });
    window.localStorage.setItem(
      "trad",
      JSON.stringify({IdTranslator: trad.Id_Translator, name: trad.FirstName, img: trad.Image })
    );
  };

  const getImgURL = (FirstName) => {
    if (FirstName === "Jenny") {
      return trad1;
    }
    if (FirstName === "Leslie") {
      return trad2;
    }
    if (FirstName === "Oprah") {
      return trad3;
    }
    return trad4;
  };
  return (
    <div className="traducteur-page">
      <section className="home-head-container">
        <img
          data-aos="fade-down"
          className="home-head-img"
          src={headerImg}
          alt="traduction"
        />
        <div className="trad-text-container">
          <h3>
            Obtenez une traduction certifiée fiable et rapide dès maintenant!
          </h3>
          <p>
            Besoin d'une traduction officielle reconnue par des institutions,
            des entreprises et des autorités légales dans le monde entier?
            Faites appel à notre service de traduction certifiée! Nos
            traducteurs assermentés, agréés ou accrédités garantissent
            l'exactitude et la fidélité de vos documents. Chaque traduction est
            accompagnée d'un cachet, d'une signature et d'une déclaration
            formelle pour une acceptation universelle. Ne perdez plus de temps,
            obtenez une traduction certifiée fiable et rapide dès maintenant!
          </p>
        </div>
      </section>
      <section className="home-traducteurs-section">
        <div className="home-traducteurs-div">
          <h1>Nos traducteurs certifiés</h1>
          <div style={{ display: "flex" }}>
            <select style={{border: "1px solid black" }}
              onChange={(e) =>
                setTraduction({ ...traduction, from: e.target.value })
              }
              id="country"
              className="home-select-traducteurs-left"
            >
              <option value="Francais">Francais</option>
              <option value="Anglais">Anglais</option>
              <option value="Italien">Italien</option>
              <option value="Allemand">Allemand</option>
            </select>
            <select style={{border: "1px solid black" }}
              onChange={(e) =>
                setTraduction({ ...traduction, to: e.target.value })
              }
              className="home-select-traducteurs-right"
            >
              <option value="Anglais">Anglais</option>
              <option value="Francais">Francais</option>
              <option value="Italien">Italien</option>
              <option value="Allemand">Allemand</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>De: </p>
            <img src={getFlag(traduction.from)} alt="img from" />
            <p>A: </p>
            <img src={getFlag(traduction.to)} alt="img from" />
          </div>
          <div className="home-traducteurs-cards">
            {traducteurs.length > 0 &&
              traducteurs.map((trad) => (
                <div
                  key={trad.Id_Translator}
                  onClick={() => handleCardClick(trad)}
                  className={
                    traduction.traducteur === trad.Id_Translator
                      ? "card-container"
                      : "card-container"
                  }
                >
                  <Card
                    // img={getImgURL(trad.FirstName)}
                    name={`${trad.LastName} ${trad.FirstName}`}
                    type="Traducteur assermenté"
                  />
                </div>
              ))}
          </div>
          <button
            onClick={() => {
              window.location.replace(
                `/devis?from=${traduction.from}&to=${traduction.to}&traducteur=${traduction.traducteur}`
              );
            }}
            className="home-traducteurs-button"
            type="button"
          >
            Commencez Maintenant
          </button>
        </div>
      </section>

      <section className="section-document">
        <div>
          <h1>Nos services de traduction assermentée et certifiée</h1>
          <p>COMMANDEZ EN LIGNE SIMPLEMENT ET RAPIDEMENT</p>
        </div>
        <br />
        <div
          className="document-cards"
          data-aos="fade-up"
          data-aos-delay={1000}
        >
          <CardDocument src={permis} title=" PERMIS DE CONDUIRE" />
          <CardDocument src={diplome} title=" DIPLÔME" />
          <CardDocument src={naissance} title=" Acte de naissance" />
          <CardDocument src={note} title=" Bulletin de note" />
          <CardDocument src={famille} title=" Livret de famille" />
          <CardDocument src={medical} title=" Rapport médical" />
        </div>
      </section>

      <section className="home-devis-section">
        <h2>METTEZ-NOUS À L'ÉPREUVE</h2>
        <button className="home-traducteurs-button" type="button">
          Obtenez un devis instantané
        </button>
      </section>
    </div>
  );
}
