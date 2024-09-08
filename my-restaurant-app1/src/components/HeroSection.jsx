import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { theme } from '../styles/theme';
import restaurantHeroImage from '../assets/restaurant-hero.jpg'; // Import the image

const HeroContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => props.loaded ? 0.5 : 0};
  transition: opacity 1s ease-in-out;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 1;
`;

const AnimatedText = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${theme.colors.white};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const ExploreButton = styled(motion.button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover:before {
    width: 100%;
  }
`;

const scrambleText = (text, progress) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  return text
    .split('')
    .map((char, index) => {
      if (index < text.length * progress) {
        return char;
      }
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
};

function HeroSection() {
  const [scrambledText, setScrambledText] = useState('');
  const controls = useAnimation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let progress = 0;
    const targetText = 'Let Him Cook!';
    const interval = setInterval(() => {
      progress += 0.05;
      setScrambledText(scrambleText(targetText, progress));
      if (progress >= 1) {
        clearInterval(interval);
        controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.5 } });
      }
    }, 50);

    // Preload the image
    const img = new Image();
    img.src = restaurantHeroImage;
    img.onload = () => setImageLoaded(true);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <HeroContainer>
      <BackgroundImage 
        src={restaurantHeroImage}
        loaded={imageLoaded}
      />
      <HeroContent>
        <AnimatedText animate={controls}>{scrambledText}</AnimatedText>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Embark on a gastronomic journey through the finest restaurants in your area
        </HeroSubtitle>
        <ExploreButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Now
        </ExploreButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
