import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import "./scss/style.scss";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Devis from "./pages/Devis";
import ContactForm from "./pages/Contact";
import Traducteur from "./pages/Traducteur";
import ClientForm from "./pages/ClientForm";
import ProfileCard from "./pages/Profil";
import HomeAdmin from "./pages/HomeAdmin";

import { AuthProvider } from "./contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import dashboardRoutes from "./routes/adminRoutes";
import DashboardLayout from "./pages/layout/DashboardLayout";
import DefaultLayout from "./pages/layout/DefaultLayout";
import defaultRoutes from "./routes/dafaultRoutes";

AOS.init();

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes principales avec DefaultLayout */}
        <Route path="/*" element={<DefaultLayout />}>
          {defaultRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Routes admin sans DashboardLayout */}
        <Route path="/admin/*" element={<DashboardLayout />}>
          {dashboardRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
