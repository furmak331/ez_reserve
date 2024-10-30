import React from 'react';

import { ThemeProvider } from 'styled-components';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { theme } from './styles/theme';

import Home from './pages/Home';

import CustomCursor from './components/CustomCursor';

import SignUp from './pages/SignUp';

import Login from './pages/Login';

import PhoneVerification from './pages/PhoneVerification';

import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-phone" element={<PhoneVerification />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;