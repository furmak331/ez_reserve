import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignInAlt } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${theme.colors.primary};
  backdrop-filter: blur(10px);
  transition: box-shadow 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    width: 40px;
    height: 40px;
  }
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
`;

const NavLinkItem = styled.li``;

const NavLink = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: ${theme.colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthLink = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const MobileMenuIcon = styled.button`
  display: none;
  color: ${theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${theme.colors.primary};
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileAuthLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const headerVariants = {
  hidden: { y: -80 },
  visible: { y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  exit: { y: -80, transition: { duration: 0.3 } },
};

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <HeaderContainer
        variants={headerVariants}
        initial="visible"
        animate="visible"
      >
        <HeaderContent>
          <Logo to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke={theme.colors.white} strokeWidth="5" fill="none" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill={theme.colors.white}
                fontSize="24px"
                fontFamily={theme.fonts.heading}
              >
                EzReserve
              </text>
            </svg>
            EzReserve
          </Logo>
          <Nav>
            <NavLinks>
              {['Home', 'Restaurants', 'About', 'Contact'].map((item) => (
                <NavLinkItem key={item}>
                  <NavLink to={`/${item.toLowerCase()}`} onClick={handleNavClick}>
                    {item}
                  </NavLink>
                </NavLinkItem>
              ))}
            </NavLinks>
          </Nav>
          <AuthLinks>
            <AuthLink to="/login">
              <FaSignInAlt /> Log In
            </AuthLink>
            <AuthLink to="/signup">
              <FaUser /> Sign Up
            </AuthLink>
          </AuthLinks>
          <MobileMenuIcon 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuIcon>
        </HeaderContent>
      </HeaderContainer>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLinks>
              {['Home', 'Restaurants', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <NavLink to={`/${item.toLowerCase()}`} onClick={handleNavClick}>
                    {item}
                  </NavLink>
                </li>
              ))}
            </MobileNavLinks>
            <MobileAuthLinks>
              <AuthLink to="/login" onClick={handleNavClick}>
                <FaSignInAlt /> Log In
              </AuthLink>
              <AuthLink to="/signup" onClick={handleNavClick}>
                <FaUser /> Sign Up
              </AuthLink>
            </MobileAuthLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;