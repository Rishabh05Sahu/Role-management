import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import PermissionsPage from "./pages/PermissionsPage";

const App = () => (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
      </Routes>
    </Router>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default App;
