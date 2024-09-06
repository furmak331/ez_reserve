import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Image, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const RestaurantDetails = () => {
  const { id } = useParams();

  // This would typically come from an API
  const restaurant = {
    id: id,
    name: 'Restaurant ' + id,
    cuisine: 'Sample Cuisine',
    description: 'A lovely restaurant with great ambiance and delicious food.',
    image: 'https://via.placeholder.com/600x400.png?text=Restaurant+' + id,
    rating: 4.5,
    priceRange: '$$',
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={restaurant.image} alt={restaurant.name} borderRadius="lg" mb={6} />
      <VStack align="start" spacing={4}>
        <Heading as="h2" size="2xl">
          {restaurant.name}
        </Heading>
        <HStack>
          <Badge colorScheme="green">{restaurant.cuisine}</Badge>
          <Badge colorScheme="purple">{restaurant.rating} ★</Badge>
          <Badge colorScheme="gray">{restaurant.priceRange}</Badge>
        </HStack>
        <Text fontSize="lg">{restaurant.description}</Text>
        <Button as={Link} to={`/reservation/${id}`} colorScheme="teal" size="lg">
          Make a Reservation
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default RestaurantDetails;