import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Components/Home/Hero.jsx';
import Login from "./Pages/Login.jsx"
import Working from './Pages/Working.jsx';
import ContactForm from "./Components/Home/ContactForm.jsx"
import EditPortal from './Pages/EditPortal.jsx';
import Profile from './Pages/Profile.jsx';

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
      </Routes>

      </div>
    </Router>
  );
}

export default App;
