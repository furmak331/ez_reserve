import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const RestaurantList = ({ restaurants }) => {
  return (
    <>
      {restaurants.map((restaurant) => (
        <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card raised style={{ padding: '10px', backgroundColor: '#f3e5f5' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {restaurant.location}
                </Typography>
                <Button component={Link} to={`/restaurant/${restaurant.id}`} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </>
  );
};

export default RestaurantList;
