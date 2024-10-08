import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#D4AF37', // Rich gold
    secondary: '#8B4513', // Saddle brown
    accent: '#C41E3A', // Cardinal red
    background: '#FFE5CA', // Light gray background
    text: '#333333', // Dark gray text
    textLight: '#666666', // Medium gray text
    white: '#FFFFFF',
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Playfair Display', serif",
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Playfair+Display:wght@400;700&display=swap');

  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.accent};
  }
`;
