import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import TableBooking from '../components/TableBooking';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    id,
    name: 'Sample Restaurant',
    location: 'Sample Location',
    tablesAvailable: 5,
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Card raised style={{ width: '600px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4">{restaurant.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Location: {restaurant.location}
          </Typography>
          <TableBooking availableTables={restaurant.tablesAvailable} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantPage;
