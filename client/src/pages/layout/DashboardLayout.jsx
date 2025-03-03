import React, { Suspense } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/AppHeader";
import Footer from "../../components/admin/Footer";
import { Outlet } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <div className="body flex-grow-1">
          <CContainer className="px-4" lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <Outlet /> {/* Route content */}
            </Suspense>
          </CContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
