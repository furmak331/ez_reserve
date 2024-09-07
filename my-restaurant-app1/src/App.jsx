// src/App.jsx
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
