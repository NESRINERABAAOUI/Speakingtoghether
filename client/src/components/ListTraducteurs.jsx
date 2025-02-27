import "../styles/admin-traducteur.scss";
import { useState, useEffect } from "react";
import { getTranslators, updateTraducteur, deleteTraducteur, createTraducteur } from "../services/usersData";

const TraducteurComponent = () => {
  const [traducteurs, setTraducteurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTrad, setEditingTrad] = useState(null);
  const [addingTrad, setAddingTrad] = useState(false);
  const [newTrad, setNewTrad] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    NumberPhone: "",
    Password: "",
    Language: ""
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    NumberPhone: "",
    Language: ""
  });

  const validateForm = (form) => {
    const errors = {};

    // Validation Prénom et Nom (seulement des lettres)
    if (!form.FirstName || !/^[A-Za-z]+$/.test(form.FirstName)) errors.FirstName = "Prénom invalide. Utilisez uniquement des lettres.";
    if (!form.LastName || !/^[A-Za-z]+$/.test(form.LastName)) errors.LastName = "Nom invalide. Utilisez uniquement des lettres.";

    // Validation Email
    if (!form.Email || !/\S+@\S+\.\S+/.test(form.Email)) errors.Email = "Email invalide.";

    // Validation Password
    if (!form.Password) errors.Password = "Mot de passe est requis.";

    // Validation Numéro de téléphone (seulement des chiffres)
    if (!form.NumberPhone || !/^\d+$/.test(form.NumberPhone)) errors.NumberPhone = "Numéro de téléphone invalide. Utilisez uniquement des chiffres.";

    // Validation Langue (seulement des lettres)
    if (!form.Language || !/^[A-Za-z]+$/.test(form.Language)) errors.Language = "Langue invalide. Utilisez uniquement des lettres.";

    return errors;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const trads = await getTranslators();
        setTraducteurs(trads);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (trad) => {
    setEditingTrad(trad);
  };

  const handleClose = () => {
    setEditingTrad(null);
    setAddingTrad(false);
    setErrors({});
  };

  const handleUpdate = async () => {
    const validationErrors = validateForm(editingTrad);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateTraducteur(editingTrad);
      const updatedList = await getTranslators();
      setTraducteurs(updatedList);
      setEditingTrad(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTraducteur(id);
      const updatedList = await getTranslators();
      setTraducteurs(updatedList);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleAddTranslator = async () => {
    const validationErrors = validateForm(newTrad);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createTraducteur(newTrad);
      const updatedList = await getTranslators();
      setTraducteurs(updatedList);
      setAddingTrad(false);
      setNewTrad({ FirstName: "", LastName: "", Email: "", NumberPhone: "", Language: "" });
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <div className="traducteur-container">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <>
          <button className="mb-4" onClick={() => setAddingTrad(true)}>Ajouter</button>

          <h1>Traducteurs</h1>
          <div >
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {traducteurs.map((trad) => (
                  <tr key={trad.Id_Translator}>
                    <td>{trad.Id_Translator}</td>
                    <td>{trad.Email}</td>
                    <td>{trad.FirstName}</td>
                    <td>{trad.LastName}</td>
                    <td>{trad.NumberPhone}</td>
                    <td className="cont">
                      <button onClick={() => handleEdit(trad)}>Modifier</button>
                      <button onClick={() => handleDelete(trad.Id_Translator)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal de modification */}
      {editingTrad && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Modifier Traducteur</h2>
            <input type="text" className="modal-input" value={editingTrad.FirstName} onChange={(e) => setEditingTrad({...editingTrad, FirstName: e.target.value})} />
            {errors.FirstName && <span style={{color:"red"}}>{errors.FirstName}</span>}
            <input type="text" className="modal-input" value={editingTrad.LastName} onChange={(e) => setEditingTrad({...editingTrad, LastName: e.target.value})} />
            {errors.LastName && <span style={{color:"red"}}>{errors.LastName}</span>}
            <input type="email" className="modal-input" value={editingTrad.Email} onChange={(e) => setEditingTrad({...editingTrad, Email: e.target.value})} />
            {errors.Email && <span style={{color:"red"}}>{errors.Email}</span>}
            <input type="text" className="modal-input" value={editingTrad.NumberPhone} onChange={(e) => setEditingTrad({...editingTrad, NumberPhone: e.target.value})} />
            {errors.NumberPhone && <span style={{color:"red"}}>{errors.NumberPhone}</span>}
            <input type="text" className="modal-input" value={editingTrad.Language} onChange={(e) => setEditingTrad({...editingTrad, Language: e.target.value})} />
            {errors.Language && <span style={{color:"red"}}>{errors.Language}</span>}
            <div className="modal-actions">
              <button onClick={handleClose} className="cancel-button">Annuler</button>
              <button onClick={handleUpdate} className="save-button">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout */}
      {addingTrad && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Ajouter Traducteur</h2>
            <input type="text" className="modal-input" placeholder="Prénom" value={newTrad.FirstName} onChange={(e) => setNewTrad({ ...newTrad, FirstName: e.target.value })} />
            {errors.FirstName && <span style={{color:"red"}}>{errors.FirstName}</span>}
            <input type="text" className="modal-input" placeholder="Nom" value={newTrad.LastName} onChange={(e) => setNewTrad({ ...newTrad, LastName: e.target.value })} />
            {errors.LastName && <span style={{color:"red"}}>{errors.LastName}</span>}
            <input type="email" className="modal-input" placeholder="Email" value={newTrad.Email} onChange={(e) => setNewTrad({ ...newTrad, Email: e.target.value })} required />
            {errors.Email && <span style={{color:"red"}}>{errors.Email}</span>}
            <input type="password" className="modal-input" placeholder="Password" value={newTrad.Password} onChange={(e) => setNewTrad({ ...newTrad, Password: e.target.value })} required />
            {errors.Password && <span style={{color:"red"}}>{errors.Password}</span>}
            <input type="text" className="modal-input" placeholder="Téléphone" value={newTrad.NumberPhone} onChange={(e) => setNewTrad({ ...newTrad, NumberPhone: e.target.value })} />
            {errors.NumberPhone && <span style={{color:"red"}}>{errors.NumberPhone}</span>}
            <input type="text" className="modal-input" placeholder="Langue" value={newTrad.Language} onChange={(e) => setNewTrad({ ...newTrad, Language: e.target.value })} />
            {errors.Language && <span style={{color:"red"}}>{errors.Language}</span>}
            <div className="modal-actions">
              <button onClick={handleClose} className="cancel-button">Annuler</button>
              <button onClick={handleAddTranslator} className="save-button">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraducteurComponent;
