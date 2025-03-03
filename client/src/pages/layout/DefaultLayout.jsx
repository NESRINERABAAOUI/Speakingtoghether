import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <NavBar />
      <div style={{ flex: 1 }}>
        {" "}
        <Outlet /> {/* Route content */}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
