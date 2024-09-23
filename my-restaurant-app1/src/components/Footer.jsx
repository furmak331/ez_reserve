import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background-color: #1A1A1A; // Dark background
  color: ${theme.colors.white};
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.primary};
`;

const FooterLink = styled(motion.a)`
  color: #B0B0B0; // Light gray for better readability
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: #B0B0B0; // Light gray for better readability
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #808080; // Medium gray for less emphasis
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>GourmetGuide</FooterTitle>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Our Team</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>For Restaurants</FooterTitle>
          <FooterLink href="#">Partner with Us</FooterLink>
          <FooterLink href="#">Restaurant Dashboard</FooterLink>
          <FooterLink href="#">Marketing Tools</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>For Diners</FooterTitle>
          <FooterLink href="#">Find Restaurants</FooterLink>
          <FooterLink href="#">Book a Table</FooterLink>
          <FooterLink href="#">Loyalty Program</FooterLink>
          <FooterLink href="#">Gift Card</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Connect with Us</FooterTitle>
          <SocialIcons>
            <SocialIcon href="#" whileHover={{ y: -3 }}><FaFacebookF /></SocialIcon>
            <SocialIcon href="#" whileHover={{ y: -3 }}><FaTwitter /></SocialIcon>
            <SocialIcon href="#" whileHover={{ y: -3 }}><FaInstagram /></SocialIcon>
            <SocialIcon href="#" whileHover={{ y: -3 }}><FaLinkedinIn /></SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <Copyright>&copy; 2023 GourmetGuide. All rights reserved.</Copyright>
    </FooterContainer>
  );
}

export default Footer;
