import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Devis.scss";
import france from "../assets/images/france.png";
import italy from "../assets/images/italy.png";
import usa from "../assets/images/usa.png";
import germany from "../assets/images/germany.png";
import { createDevis } from "../services/devis";
import DevisCard from "../components/DevisCard";
import { getTranslators } from "../services/trasnlators";

// Helper function to get the flag image based on language
const getFlag = (value) => {
  switch (value) {
    case "Français":
      return france;
    case "Anglais":
      return usa;
    case "Italien":
      return italy;
    case "Allemand":
      return germany;
    default:
      return france;
  }
};

// Simulated function to copy file to uploads folder (Server-side handling needed in real use)
const copyFileToUploads = async (file) => {
  const uploadPath = `/uploads/${file.name}`;
  return uploadPath;
};

function Devis() {
  const [traduction, setTraduction] = useState({
    from: "Français",
    to: "Anglais",
    traducteur:
      "/src/assets/images/2.jpg" ||
      JSON.parse(window.localStorage.getItem("trad"))?.img,
    traducteurName:
      "Maître Leslie Alexander" ||
      JSON.parse(window.localStorage.getItem("trad"))?.name,
  });

  const [devisData, setDevisData] = useState({
    Email: "",
    Id_Translator: 1,
    FirstClientName: "",
    LastClientName: "",
    Language_Doc: "Anglais",
    FileType: "",
    FilePath: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [translators, setTranslators] = useState([]);

  useEffect(() => {
    const getTranslatorsList = async () => {
      try {
        const translatorsData = await getTranslators();
        if (translatorsData) {
          setTranslators(translatorsData);
        }
      } catch (error) {
        console.error("Failed to fetch translators:", error);
      }
    };
    getTranslatorsList();
  }, []);

  useEffect(() => {
    const getData = () => {
      const params = new URLSearchParams(window.location.search);
      const from = params.get("from");
      const to = params.get("to");

      const traducteurNameAndImg = JSON.parse(
        window.localStorage.getItem("trad")
      );

      if (from && to) {
        setTraduction((prevTraduction) => ({
          ...prevTraduction,
          from,
          to,
        }));

        if (traducteurNameAndImg?.img && traducteurNameAndImg?.name) {
          setTraduction((prevTraduction) => ({
            ...prevTraduction,
            traducteurName: traducteurNameAndImg.name,
            traducteur: traducteurNameAndImg.img,
          }));
        }
      }
    };

    getData();
  }, []);

  const notify = (message) => toast(message);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileType = file.type;

      try {
        const filePath = await copyFileToUploads(file); // Copy file and get the new path

        // Update the devisData state with the new file path and file type
        setDevisData((prevData) => ({
          ...prevData,
          FileType: fileType,
          FilePath: filePath,
        }));
      } catch (error) {
        console.error("Error copying file:", error);
        notify("Failed to copy the file");
      }
    }
  };

  const handleSendDevis = async () => {
    if (!selectedFile) {
      notify("Please upload a file before submitting");
      return;
    }
    try {
      const response = await createDevis(devisData);
      console.log(response);
      
      if (response.data) {
        notify(`Devis: ${response.data.devis}`);
      } else {
        notify("Error: Unable to create devis");
      }
    } catch (error) {
      console.error("Error: ", error);
      notify("An error occurred while sending the devis");
    }
  };

  return (
    <div className="devis-main-container">
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2%",
            marginBottom: "2%",
          }}
        >
          <DevisCard
            src="frensh"
            language="Traductions vers le français"
            description=" 
							(de l'anglais, du français, de l'espagnol...) 
							à partir de 0,08 € / par mot."
          />
          <DevisCard
            src="english"
            language="Traductions vers l'anglais"
            description=" 
							(de l'anglais, du français, de l'espagnol...) 
							à partir de 0,08 € / par mot."
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2%",
            marginBottom: "2%",
          }}
        >
          <DevisCard
            src="italien"
            language="Traductions vers l'italien"
            description=" 
							(de l'anglais, du français, de l'espagnol...) 
							à partir de 0,08 € / par mot."
          />
          <DevisCard
            src={france}
            language="Traductions vers l'allemand"
            description=" 
							(de l'anglais, du français, de l'espagnol...) 
							à partir de 0,08 € / par mot."
          />
        </div>
      </section>
      <section className="devis-head-section">
        <div>
          <h1 className="devis-title">La traduction certifiée</h1>
          <h2 className="devis-subtitle">
            Obtenez une traduction certifiée fiable et rapide dès MAINTENANT!
          </h2>
          <p className="devis-description">
            Ne perdez plus de temps, obtenez une traduction certifiée fiable et
            rapide dès maintenant!
          </p>
          <button type="button" className="devis-button">
            Commencer maintenant
          </button>
        </div>
      </section>

      <h1 style={{ color: "black" }}>Traduction assermentée</h1>
      <form className="devis-form" onSubmit={(e) => e.preventDefault()}>
        <div className="devis-form-row">
          <input
            onChange={(e) =>
              setDevisData((prevData) => ({
                ...prevData,
                LastClientName: e.target.value,
              }))
            }
            type="text"
            placeholder="Nom"
            required
          />
          <input
            onChange={(e) =>
              setDevisData((prevData) => ({
                ...prevData,
                FirstClientName: e.target.value,
              }))
            }
            type="text"
            placeholder="Prénom"
            required
          />
          <input
            onChange={(e) =>
              setDevisData((prevData) => ({
                ...prevData,
                Email: e.target.value,
              }))
            }
            type="text"
            placeholder="Email"
            required
          />
        </div>
        <div className="devis-language-selection">
          <div className="devis-select-container">
            <select
              onChange={(e) => {
                const selectedValue = e.target.value;
                setTraduction((prevTraduction) => ({
                  ...prevTraduction,
                  from: selectedValue,
                }));
                setDevisData((prevData) => ({
                  ...prevData,
                  Language_Doc: selectedValue,
                }));
              }}
              className="devis-select"
              value={traduction.from}
            >
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
              <option value="Italien">Italien</option>
              <option value="Allemand">Allemand</option>
            </select>
            <img src={getFlag(traduction.from)} alt="From Flag" />
          </div>
          <div className="devis-select-container">
            <select
              className="devis-select"
              onChange={(e) => {
                const selectedValue = e.target.value;
                setTraduction((prevTraduction) => ({
                  ...prevTraduction,
                  to: selectedValue,
                }));
                setDevisData((prevData) => ({
                  ...prevData,
                  Language_Doc: selectedValue,
                }));
              }}
              value={traduction.to}
            >
              <option value="Anglais">Anglais</option>
              <option value="Français">Français</option>
              <option value="Italien">Italien</option>
              <option value="Allemand">Allemand</option>
            </select>
            <img src={getFlag(traduction.to)} alt="To Flag" />
          </div>
        </div>
        {translators.length > 0 && (
          <select
            onChange={(e) => {
              const selectedTranslatorId = Number(e.target.value); // Ensure it's a number
              setDevisData((prevData) => ({
                ...prevData,
                Id_Translator: selectedTranslatorId,
              }));
            }}
            className="devis-select"
            value={devisData.Id_Translator}
          >
            {translators.map((translator) => (
              <option
                key={translator.Id_Translator}
                value={translator.Id_Translator}
              >
                {`${translator.FirstName} ${translator.LastName}`}
              </option>
            ))}
          </select>
        )}
        <input
          style={{ color: "black" }}
          type="file"
          name="importfile"
          className="devis-form-file-import"
          onChange={handleFileChange}
          required
        />
        <button
          type="button"
          className="devis-form-button"
          onClick={handleSendDevis}
        >
          Voir le devis
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Devis;
