
import ClientForm from "../pages/ClientForm";
import ContactForm from "../pages/Contact";
import Devis from "../pages/Devis";
import Home from "../pages/Home";
import HomeAdmin from "../pages/HomeAdmin";
import Login from "../pages/Login";
import ProfileCard from "../pages/Profil";
import Register from "../pages/Register";
import Traducteur from "../pages/Traducteur";

const defaultRoutes = [
    { path: "", element: <Home /> }, 
    { path: "traducteur", element: <Traducteur /> }, 
    { path: "contact", element: <ContactForm /> }, 
    { path: "devis", element: <Devis /> }, 
    { path: "login", element: <Login /> }, 
    { path: "profile", element: <ProfileCard /> }, 
    { path: "register", element: <Register /> }, 
    { path: "homeadmin", element: <HomeAdmin /> }, 
    { path: "modifProfile", element: <ClientForm /> }, 
];

export default defaultRoutes;
