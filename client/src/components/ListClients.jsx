import * as React from "react";
import { useEffect, useState } from "react";
import "../styles/admin-client.scss";

import { getClients, createClient, updateClient, deleteClient } from "../services/usersData";

const ClientsComponent = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newClient, setNewClient] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    NumberPhone: "",
    Password: "",
  });
  const [editingClient, setEditingClient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // État pour afficher ou masquer le formulaire d'ajout
  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    NumberPhone: "",
    Password: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const clientsData = await getClients();
      setClients(clientsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };
  
    // Prénom : autorise lettres 
    if (!/^[a-zA-Z]+$/.test(newClient.FirstName)) {
      newErrors.FirstName = "Le prénom ne doit contenir  des chiffres.";
      valid = false;
    } else {
      newErrors.FirstName = "";
    }
  
    // Nom : autorise lettres 
    if (!/^[a-zA-Z0-9]+$/.test(newClient.LastName)) {
      newErrors.LastName = "Le nom ne doit contenir  des chiffres.";
      valid = false;
    } else {
      newErrors.LastName = "";
    }
  
    // Email : vérifie la validité de l'email
    if (!/\S+@\S+\.\S+/.test(newClient.Email)) {
      newErrors.Email = "L'email doit être valide.";
      valid = false;
    } else {
      newErrors.Email = "";
    }
  
    // Numéro de téléphone : autorise uniquement les chiffres
    if (!/^\d+$/.test(newClient.NumberPhone)) {
      newErrors.NumberPhone = "Le numéro de téléphone ne doit contenir que des chiffres.";
      valid = false;
    } else {
      newErrors.NumberPhone = "";
    }
  
    // Mot de passe : doit comporter au moins 8 caractères
    if (newClient.Password.length < 8) {
      newErrors.Password = "Le mot de passe doit comporter au moins 8 caractères.";
      valid = false;
    } else {
      newErrors.Password = "";
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const validateupdate = () => {
    let valid = true;
    let newErrors = { ...errors };
  
    // Prénom : autorise lettres et chiffres
    if (!/^[a-zA-Z]+$/.test(editingClient.FirstName)) {
      newErrors.FirstName = "Le prénom ne doit contenir  des chiffres.";
      valid = false;
    } else {
      newErrors.FirstName = "";
    }
  
    // Nom : autorise lettres et chiffres
    if (!/^[a-zA-Z]+$/.test(editingClient.LastName)) {
      newErrors.LastName = "Le nom ne doit contenir  des chiffres.";
      valid = false;
    } else {
      newErrors.LastName = "";
    }
  
    // Email : vérifie la validité de l'email
    if (!/\S+@\S+\.\S+/.test(editingClient.Email)) {
      newErrors.Email = "L'email doit être valide.";
      valid = false;
    } else {
      newErrors.Email = "";
    }
  
    // Numéro de téléphone : autorise uniquement les chiffres
    if (!/^\d+$/.test(editingClient.NumberPhone)) {
      newErrors.NumberPhone = "Le numéro de téléphone ne doit contenir que des chiffres.";
      valid = false;
    } else {
      newErrors.NumberPhone = "";
    }
  
  
  
    setErrors(newErrors);
    return valid;
  };
  
  const handleAddClient = async () => {
    if (validate()) {
      await createClient(newClient);
      setNewClient({
        FirstName: "",
        LastName: "",
        Email: "",
        NumberPhone: "",
        Password: "",
      });
      setLoading(true);
      const clientsData = await getClients();
      setClients(clientsData);
      setLoading(false);
      setShowAddForm(false); // Masquer le formulaire après ajout
    }
  };

  const handleUpdateClient = async () => {
    if (validateupdate()) {
      await updateClient(editingClient);
      setEditingClient(null);
      setLoading(true);
      const clientsData = await getClients();
      setClients(clientsData);
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    await deleteClient(clientId);
    setLoading(true);
    const clientsData = await getClients();
    setClients(clientsData);
    setLoading(false);
  };

  const closeForm = () => {
    setNewClient({
      FirstName: "",
      LastName: "",
      Email: "",
      NumberPhone: "",
      Password: "",
    });
    setEditingClient(null);
    setShowAddForm(false); // Fermer le formulaire d'ajout
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={() => { setEditingClient(null); setShowAddForm(true); }}>Ajouter</button>

          <div className="table-container">
            <h1>Clients</h1>
            <table border={1}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Telephone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.Id_Client}>
                    <td>{client.Id_Client}</td>
                    <td>{client.Email}</td>
                    <td>{client.FirstName}</td>
                    <td>{client.LastName}</td>
                    <td>{client.NumberPhone}</td>
                    <td className="con">
                      <button onClick={() => setEditingClient(client)}>Modifier</button>
                      <button onClick={() => handleDeleteClient(client.Id_Client)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formulaire de modification */}
          {editingClient && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Modifier Client</h2>
                <input
                  type="text"
                  className="modal-input"
                  value={editingClient.FirstName}
                  onChange={(e) => setEditingClient({...editingClient, FirstName: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.FirstName && errors.FirstName}</span>
                <input
                  type="text"
                  className="modal-input"
                  value={editingClient.LastName}
                  onChange={(e) => setEditingClient({...editingClient, LastName: e.target.value})}
                />
               <span style={{color:"red"}}>  {errors.LastName && errors.LastName}</span>
                <input
                  type="email"
                  className="modal-input"
                  value={editingClient.Email}
                  onChange={(e) => setEditingClient({...editingClient, Email: e.target.value})}
                />
               <span style={{color:"red"}}>  {errors.Email && errors.Email}</span>
                <input
                  type="text"
                  className="modal-input"
                  value={editingClient.NumberPhone}
                  onChange={(e) => setEditingClient({...editingClient, NumberPhone: e.target.value})}
                />
               <span style={{color:"red"}}> {errors.NumberPhone && errors.NumberPhone}</span>
                <div className="modal-actions">
                  <button onClick={closeForm} className="cancel-button">Annuler</button>
                  <button onClick={handleUpdateClient} className="save-button">Enregistrer</button>
                </div>
              </div>
            </div>
          )}

          {/* Formulaire d'ajout */}
          {showAddForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Ajouter client</h2>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Prénom"
                  value={newClient.FirstName}
                  onChange={(e) => setNewClient({...newClient, FirstName: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.FirstName && errors.FirstName}</span>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Nom"
                  value={newClient.LastName}
                  onChange={(e) => setNewClient({...newClient, LastName: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.LastName && errors.LastName}</span>
                <input
                  type="email"
                  className="modal-input"
                  placeholder="Email"
                  value={newClient.Email}
                  onChange={(e) => setNewClient({...newClient, Email: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.Email &&errors.Email}</span>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Phone"
                  value={newClient.NumberPhone}
                  onChange={(e) => setNewClient({...newClient, NumberPhone: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.NumberPhone && errors.NumberPhone}</span>
                <input
                  type="password"
                  className="modal-input"
                  placeholder="Password"
                  value={newClient.Password}
                  onChange={(e) => setNewClient({...newClient, Password: e.target.value})}
                />
                <span style={{color:"red"}}> {errors.Password && errors.Password}</span>
                <div className="modal-actions">
                  <button onClick={closeForm} className="cancel-button">Annuler</button>
                  <button onClick={handleAddClient} className="save-button">Enregistrer</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientsComponent;
