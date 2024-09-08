import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const Card = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.large};
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Name = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
`;

const Cuisine = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.span`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const RatingValue = styled.span`
  font-weight: bold;
  color: ${theme.colors.text};
`;

function RestaurantCard({ restaurant }) {
  const stars = "★".repeat(Math.floor(restaurant.rating)) + "☆".repeat(5 - Math.floor(restaurant.rating));

  return (
    <Card
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <Image src={restaurant.image} alt={restaurant.name} />
      </ImageContainer>
      <Content>
        <Name>{restaurant.name}</Name>
        <Cuisine>{restaurant.cuisine} Cuisine</Cuisine>
        <Rating>
          <Stars>{stars}</Stars>
          <RatingValue>{restaurant.rating.toFixed(1)}</RatingValue>
        </Rating>
      </Content>
    </Card>
  );
}

export default RestaurantCard;
