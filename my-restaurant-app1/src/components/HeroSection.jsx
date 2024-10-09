import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const HeroContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1350px;
  width: 100%;
  height: 80vh;
`;

const GridItem = styled(motion.div)`
  background-color: ${props => props.bgColor || theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
`;

const LongItem = styled(GridItem)`
  grid-column: span 2;
  grid-row: span 2;
`;

const ShortItem = styled(GridItem)`
  grid-row: span 2;
`;

const ItemImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GridItem}:hover & {
    transform: scale(1.05);
  }
`;

const ItemContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${theme.colors.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ItemTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.heading};
`;

const ItemDescription = styled.p`
  font-size: 1rem;
  font-family: ${theme.fonts.main};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;

  ${GridItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
  letter-spacing: -1px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: ${theme.fonts.main};
  color: ${theme.colors.secondary};
  max-width: 800px;
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const HeroSection = () => {
  const gridItems = [
    {
      title: "No More 'Table for None'",
      description: `Say goodbye to awkward waits and hello to guaranteed seats. We're basically your restaurant fairy godmother, minus the pumpkin carriage.`,
      image: "src/assets/hero-image7.jpg",
      type: "long",
    },
    {
      title: "Foodie Time Machine",
      description: `Book your table faster than you can say "I'm hangry!" Time travel not included, but we're working on it.`,
      image: "src/assets/hero-image2.png",
      type: "short",
    },
    {
      title: "Date Night Hero",
      description: `Impress your date with a perfectly timed reservation. We won't tell them it was us, promise!`,
      image: "src/assets/hero-image4.jpg",
      type: "normal",
    },
    {
      title: "Group Dining, No Crying",
      description: `Organizing a group dinner? We'll handle the logistics, you handle the gossip.`,
      image: "src/assets/hero-image1.png",
      type: "normal",
    },
    {
      title: "Foodie Adventures",
      description: `Discover new cuisines nearby. It's like Tinder, but for restaurants, and with a much higher success rate!`,
      image: "src/assets/hero-image0.jpg",
      type: "normal",
    },
  ];

  return (
    <HeroContainer>
      <MainTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <b>EzReserve</b>
      </MainTitle>
      <Subtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Where 'Table for Two' is always on the menu, and 'Sorry, we're full' is off it!
      </Subtitle>
      <Grid
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {gridItems.map((item, index) => {
          const ItemComponent = item.type === 'long' ? LongItem : item.type === 'short' ? ShortItem : GridItem;
          return (
            <ItemComponent
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <ItemImage 
                src={item.image} 
                alt={item.title} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(item.title.replace(/\s/g, '+'))}`;
                }}
              />
              <Overlay />
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
            </ItemComponent>
          );
        })}
      </Grid>
      <CTAButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
       Book Now
      </CTAButton>
    </HeroContainer>
  );
};

export default HeroSection;
