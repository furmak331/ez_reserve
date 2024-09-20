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
  height: 80px;
  background-color: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
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
  font-family: ${theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.isScrolled ? theme.colors.primary : theme.colors.white};
  text-decoration: none;
  text-shadow: ${props => props.isScrolled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)'};
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(motion.a)`
  color: ${props => props.isScrolled ? theme.colors.text : theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  text-shadow: ${props => props.isScrolled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)'};

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
  gap: 1rem;
`;

const AuthLink = styled(Link)`
  color: ${props => props.isScrolled ? theme.colors.text : theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const headerVariants = {
  hidden: { y: -80 },
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
          GourmetGuide
        </Logo>
        <NavLinks>
          {['Home', 'Restaurants', 'About', 'Contact'].map((item) => (
            <NavLink
              key={item}
              href="#"
              isScrolled={isScrolled}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </NavLink>
          ))}
        </NavLinks>
        <AuthLinks>
          <AuthLink to="/login" isScrolled={isScrolled}>Log In</AuthLink>
          <AuthLink to="/signup" isScrolled={isScrolled}>Sign Up</AuthLink>
        </AuthLinks>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
