import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/RestaurantList';
import { Typography, Grid } from '@mui/material';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = [
        { id: 1, name: 'Italiano Restaurant', location: 'Downtown' },
        { id: 2, name: 'Sushi Place', location: 'Uptown' },
        { id: 3, name: 'Tandoori House', location: 'Midtown' },
      ];
      setRestaurants(response);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" style={{ margin: '20px 0', fontWeight: 700 }}>
        Choose Your Favorite Restaurant
      </Typography>
      <Grid container spacing={3}>
        <RestaurantList restaurants={restaurants} />
      </Grid>
    </div>
  );
};

export default HomePage;
