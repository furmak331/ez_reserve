import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  float: right;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Cuisine = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Rating = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.2rem;
`;

function RestaurantModal({ restaurant, onClose }) {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Image src={restaurant.image} alt={restaurant.name} />
        <Name>{restaurant.name}</Name>
        <Cuisine>{restaurant.cuisine} Cuisine</Cuisine>
        <Rating>★ {restaurant.rating.toFixed(1)}</Rating>
        <p>Additional restaurant details can be added here...</p>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RestaurantModal;
