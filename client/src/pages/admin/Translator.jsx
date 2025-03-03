import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
} from "@coreui/react";
import {
  getTranslators,
  createTraducteur,
  deleteTraducteur,
  updateTraducteur,
} from "../../services/translator";

function Translator() {
  const [traducteurs, setTraducteurs] = useState([]);
  const [editingTrad, setEditingTrad] = useState(null);
  const [addingTrad, setAddingTrad] = useState(false);
  const [newTrad, setNewTrad] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    NumberPhone: "",
    Password: "",
    Language: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = (form) => {
    const errors = {};
    if (!form.FirstName || !/^[A-Za-z]+$/.test(form.FirstName))
      errors.FirstName = "Prénom invalide. Utilisez uniquement des lettres.";
    if (!form.LastName || !/^[A-Za-z]+$/.test(form.LastName))
      errors.LastName = "Nom invalide. Utilisez uniquement des lettres.";
    if (!form.Email || !/\S+@\S+\.\S+/.test(form.Email))
      errors.Email = "Email invalide.";
    if (!form.Password) errors.Password = "Mot de passe est requis.";
    if (!form.NumberPhone || !/^\d+$/.test(form.NumberPhone))
      errors.NumberPhone =
        "Numéro de téléphone invalide. Utilisez uniquement des chiffres.";
    if (!form.Language || !/^[A-Za-z]+$/.test(form.Language))
      errors.Language = "Langue invalide. Utilisez uniquement des lettres.";
    return errors;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trads = await getTranslators();
        setTraducteurs(trads);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des traducteurs :",
          error
        );
      }
    };
    fetchData();
  }, []);

  const handleAddOrUpdate = async () => {
    const formToValidate = addingTrad ? newTrad : editingTrad;
    const validationErrors = validateForm(formToValidate);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (addingTrad) {
        await createTraducteur(newTrad);
      } else {
        await updateTraducteur(editingTrad);
      }
      const updatedList = await getTranslators();
      setTraducteurs(updatedList);
      handleClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout/mise à jour :", error);
    }
  };

  const handleClose = () => {
    setAddingTrad(false);
    setEditingTrad(null);
    setNewTrad({
      FirstName: "",
      LastName: "",
      Email: "",
      NumberPhone: "",
      Password: "",
      Language: "",
    });
    setErrors({});
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce traducteur ?"
    );

    if (isConfirmed) {
      try {
        await deleteTraducteur(id);
        const updatedList = await getTranslators();
        setTraducteurs(updatedList);
        alert("Traducteur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression du traducteur.");
      }
    } else {
      console.log("Suppression annulée");
    }
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ width: "auto" }}>
            <CCardHeader>
              <strong>Liste des traducteurs</strong>
              <CButton
                color="success"
                className="float-end"
                onClick={() => setAddingTrad(true)}
              >
                Ajouter un traducteur
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Prénom</CTableHeaderCell>
                    <CTableHeaderCell>Nom</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Langue</CTableHeaderCell>
                    <CTableHeaderCell>Téléphone</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {traducteurs.length > 0 ? (
                    traducteurs.map((trad, index) => (
                      <CTableRow key={trad.Id_Translator}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{trad.FirstName}</CTableDataCell>
                        <CTableDataCell>{trad.LastName}</CTableDataCell>
                        <CTableDataCell>{trad.Email}</CTableDataCell>
                        <CTableDataCell>{trad.Language}</CTableDataCell>
                        <CTableDataCell>{trad.NumberPhone}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => setEditingTrad(trad)}
                          >
                            Modifier
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleDelete(trad.Id_Translator)}
                          >
                            Supprimer
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="7" className="text-center">
                        Aucun traducteur trouvé.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal */}
      <CModal visible={addingTrad || !!editingTrad} onClose={handleClose}>
        <CModalHeader>
          <strong>{addingTrad ? "Ajouter" : "Modifier"} un traducteur</strong>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              {[
                "FirstName",
                "LastName",
                "Email",
                "NumberPhone",
                "Password",
                "Language",
              ].map((field) => (
                <CCol xs={12} key={field} className="mb-3">
                  <CFormLabel htmlFor={field} className="text-start d-block">
                    {field}
                  </CFormLabel>
                  <CFormInput
                    id={field}
                    value={
                      addingTrad ? newTrad[field] : editingTrad?.[field] || ""
                    }
                    onChange={(e) =>
                      addingTrad
                        ? setNewTrad({ ...newTrad, [field]: e.target.value })
                        : setEditingTrad({
                            ...editingTrad,
                            [field]: e.target.value,
                          })
                    }
                    invalid={!!errors[field]}
                    feedback={errors[field]}
                  />
                </CCol>
              ))}
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Annuler
          </CButton>
          <CButton color="primary" onClick={handleAddOrUpdate}>
            {addingTrad ? "Ajouter" : "Mettre à jour"}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default Translator;
