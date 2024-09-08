import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  z-index: 9999;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const plateAppear = keyframes`
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const Plate = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${plateAppear} 1s ease-out forwards;
`;

const foodAppear = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const Food = styled.div`
  width: 140px;
  height: 140px;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  animation: ${foodAppear} 0.5s ease-out 0.7s forwards;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background-color: ${theme.colors.accent};
    border-radius: 50%;
  }

  &::after {
    content: '🍽️';
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const steamAnimation = keyframes`
  0% { transform: translateY(0) scaleX(1); opacity: 0.8; }
  50% { transform: translateY(-20px) scaleX(1.2); opacity: 0.5; }
  100% { transform: translateY(-40px) scaleX(1); opacity: 0; }
`;

const Steam = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0;
    animation: ${steamAnimation} 2s infinite;
  }

  &::before {
    left: 0;
    animation-delay: 0.3s;
  }

  &::after {
    right: 0;
    animation-delay: 0.6s;
  }
`;

const LoadingText = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.white};
  margin-top: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

function FancyLoader() {
  const [loadingText, setLoadingText] = useState('Preparing your culinary journey');

  useEffect(() => {
    const texts = [
      'Preparing your culinary journey',
      'Simmering the flavors',
      'Garnishing the experience',
      'Plating perfection'
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Overlay />
      <ContentWrapper>
        <Plate>
          <Food />
          <Steam />
        </Plate>
        <LoadingText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loadingText}
        </LoadingText>
      </ContentWrapper>
    </LoaderContainer>
  );
}

export default FancyLoader;
