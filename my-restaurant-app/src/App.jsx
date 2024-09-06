import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
