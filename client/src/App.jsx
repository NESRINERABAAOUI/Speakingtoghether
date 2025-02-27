import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

import NavBar from "./components/Navbar";
import Devis from "./pages/Devis";
import Footer from "./components/Footer";
import ContactForm from "./pages/Contact";
import Traducteur from "./pages/Traducteur";
import ClientForm from "./pages/ClientForm";
import { AuthProvider } from "./contexts/AuthContext";
import ProfileCard from "./pages/Profil";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  return (
    <AuthProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
        }}
      >
        <NavBar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traducteur" element={<Traducteur />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/modifProfile" element={<ClientForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
