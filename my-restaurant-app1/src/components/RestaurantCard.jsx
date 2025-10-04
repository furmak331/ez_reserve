import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

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

function RestaurantCard({ restaurant, index = 0 }) {
  const rating = restaurant.rating ? Number(restaurant.rating) : 0;
  const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  return (
    <StyledLink to={`/restaurant/${restaurant.id}`}>
      <Card
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
      <ImageContainer>
        <Image src={restaurant.image_url || restaurant.image || '/assets/hero-image0.jpg'} alt={restaurant.name} />
      </ImageContainer>
      <Content>
        <Name>{restaurant.name}</Name>
        <Cuisine>{restaurant.cuisine} Cuisine</Cuisine>
        <Rating>
          <Stars>{stars}</Stars>
          <RatingValue>{restaurant.rating ? Number(restaurant.rating).toFixed(1) : '0.0'}</RatingValue>
        </Rating>
      </Content>
    </Card>
    </StyledLink>
  );
}

export default RestaurantCard;
