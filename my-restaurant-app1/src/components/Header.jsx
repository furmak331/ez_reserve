import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Link } from 'react-router-dom';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: ${props => props.isScrolled ? theme.colors.primary : theme.colors.white};
  text-decoration: none;
  text-shadow: ${props => props.isScrolled 
    ? 'none'
    : '0 0 8px rgba(0,0,0,0.5)'};
  letter-spacing: -1px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2.5rem;
`;

const NavLink = styled(motion.a)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  position: relative;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const AuthLink = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

const headerVariants = {
  hidden: { y: -90 },
  visible: { y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
};

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer
      isScrolled={isScrolled}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeaderContent>
        <Logo
          href="#"
          isScrolled={isScrolled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EzReserve
        </Logo>
        <NavLinks>
          {['Home', 'Restaurants', 'About', 'Contact'].map((item) => (
            <NavLink
              key={item}
              href="#"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </NavLink>
          ))}
        </NavLinks>
        <AuthLinks>
          <AuthLink to="/login">Log In</AuthLink>
          <AuthLink to="/signup">Sign Up</AuthLink>
        </AuthLinks>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
