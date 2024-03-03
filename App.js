import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import Home from "./Pages/Home";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login onFormSwitch={toggleForm} />} />
        <Route path="/Pages/Home" element={<Home />} />
        <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
