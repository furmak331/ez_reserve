import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { restaurantApi, reservationApi } from '../services/api';

const DetailContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const ReservationSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await restaurantApi.getById(id);
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleReservation = async () => {
    try {
      const { data } = await reservationApi.create({
        restaurantId: id,
        date: selectedDate,
        time: selectedTime,
        partySize,
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <DetailContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ImageGallery>
        <img src={restaurant.images[0]} alt={restaurant.name} />
        <div>
          {restaurant.images.slice(1, 3).map((image, index) => (
            <img key={index} src={image} alt={`${restaurant.name} ${index + 2}`} />
          ))}
        </div>
      </ImageGallery>

      <ReservationSection>
        <h2>Make a Reservation</h2>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select Time</option>
          {/* Generate time slots based on restaurant hours */}
        </select>
        <select
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
        >
          {[...Array(20)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i === 0 ? 'Person' : 'People'}
            </option>
          ))}
        </select>
        <button onClick={handleReservation}>Reserve Now</button>
      </ReservationSection>
    </DetailContainer>
  );
};

export default RestaurantDetails;