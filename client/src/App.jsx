import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./Components/Home/Hero.jsx";
import Login from "./Pages/Login.jsx";
import Working from "./Pages/Working.jsx";
import ContactForm from "./Components/Home/ContactForm.jsx";
import EditPortal from "./Pages/EditPortal.jsx";
import DashboardOne from "./Pages/DashboardOne.jsx";
import Profile from "./Pages/Profile.jsx";
// import Dashboard from "./Pages/Dashboard.jsx";
import Dashboard02 from "./Pages/Dashboard02.jsx";
import AdminProfilePortal from "./Pages/AdminProfilePortal.jsx";
import School from "./Pages/School.jsx";
import RafaMotor from "./Pages/RafaMotor.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Working />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/edit/:id" element={<EditPortal />} />
          <Route path="/:id" element={<Profile />} />
          {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}
          <Route path="/dashboard02" element={<DashboardOne />} />
           <Route path="/dashboard" element={<Dashboard02 />} />
            <Route path="/admin" element={<AdminProfilePortal />} />
          <Route
            path="/reviews/alandalus-primary-school"
            element={<School />}
          />
          <Route
            path="/reviews/saray-wellness-and-health"
            element={<RafaMotor />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
