import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Home from './pages/Home';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCursor />
      <Home />
    </ThemeProvider>
  );
}

export default App;