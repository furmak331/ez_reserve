import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  overflow: hidden;
  position: relative;
  display: flex;
`;

const ContentSection = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  padding: 0 5% 0 10%;
  z-index: 2;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  }
`;

const ImageSection = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
  }
`;

const Content = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.heading};
  letter-spacing: -1px;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.6rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.main};
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: perspective(1px) translateZ(0);

  &:hover {
    transform: perspective(1px) translateZ(10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const BackgroundImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const NavigationDots = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.white : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  opacity: ${props => props.active ? 1 : 0.7};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const sections = [
  {
    title: "Culinary Artistry",
    subtitle: "Experience the fusion of flavors and visual aesthetics in our carefully crafted dishes.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    cta: "Explore Menu"
  },
  {
    title: "Farm to Table",
    subtitle: "Savor the freshness of locally sourced ingredients, supporting our community farmers.",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    cta: "Our Suppliers"
  },
  {
    title: "Ambient Dining",
    subtitle: "Immerse yourself in our carefully crafted atmosphere, perfect for any occasion.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    cta: "Book a Table"
  }
];

const HeroSection = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <ContentSection
        initial={{ x: '-100%', rotateY: -20 }}
        animate={{ x: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Content>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Title
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {sections[currentSection].title}
              </Title>
              <Subtitle
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {sections[currentSection].subtitle}
              </Subtitle>
              <CTAButton
                whileHover={{ scale: 1.05, rotateZ: 1 }}
                whileTap={{ scale: 0.95, rotateZ: -1 }}
              >
                {sections[currentSection].cta}
              </CTAButton>
            </motion.div>
          </AnimatePresence>
        </Content>
      </ContentSection>
      <ImageSection
        initial={{ x: '100%', rotateY: 20 }}
        animate={{ x: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <BackgroundImage
            key={currentSection}
            src={sections[currentSection].image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </ImageSection>
      <NavigationDots>
        {sections.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSection}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </NavigationDots>
    </HeroContainer>
  );
};

export default HeroSection;